using Domain;
using GrainInterfaces;
using Grains.Common.Exceptions;
using Orleans;
using Orleans.Runtime;

namespace Grains;

public class RoomGrain : Grain, IRoom
{
    private readonly IPersistentState<Room> _room;

    public RoomGrain([PersistentState("room", "ticStorage")] IPersistentState<Room> room)
    {
        _room = room;
    }

    public Task<Room> OnGetRoom()
    {
        var exists = _room.RecordExists;

        if (exists == false) throw new NotFoundException(nameof(Room), this.GetPrimaryKey());

        var room = _room.State;
        return Task.FromResult(room);
    }

    public async Task OnCreateRoom(Room room)
    {
        _room.State = room;
        await _room.WriteStateAsync();

        var roomManagerGrain = GrainFactory.GetGrain<IRoomManager>(Guid.Empty);
        await roomManagerGrain.OnCreateRoom(_room.State);
    }

    public async Task<Message> OnMessageCreate(Guid userId, string content)
    {
        var id = Guid.NewGuid();
        var timestamp = DateTime.UtcNow;
        var roomId = _room.State.Id;

        var userInRoom = _room.State.Users.Any(x => x.Id == userId);

        if (userInRoom == false) throw new UnauthorizedException($"User={id} is not in this room");

        var message = new Message
        {
            Id = id,
            Content = content,
            Timestamp = timestamp,
            RoomId = roomId,
            UserId = userId
        };

        _room.State.Messages.Add(message);

        await _room.WriteStateAsync();

        return message;
    }

    public async Task<bool> OnUserJoin(Guid userId)
    {
        var userGrain = GrainFactory.GetGrain<IUser>(userId);
        var user = await userGrain.OnGetUser();

        if (user == null) throw new NotFoundException(nameof(User), userId);

        _room.State.Users.Add(user);

        await userGrain.OnJoinRoom(_room.State.Id);
        await _room.WriteStateAsync();

        return true;
    }

    public async Task<bool> OnUserLeave(Guid userId)
    {
        var user = _room.State.Users.Find(x => x.Id == userId);

        if (user == null) throw new NotFoundException(nameof(User), userId);

        _room.State.Users.Remove(user);

        await _room.WriteStateAsync();

        return true;
    }
}