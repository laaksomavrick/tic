using Domain;
using GrainInterfaces;
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
        var room = _room.State;
        return Task.FromResult(room);
    }

    public async Task OnCreateRoom(Room room)
    {
        _room.State = room;
        await _room.WriteStateAsync();
    }

    public async Task<Message> OnMessageCreate(Guid userId, string content)
    {
        var id = Guid.NewGuid();
        var timestamp = DateTime.UtcNow;
        var roomId = _room.State.Id;

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

        _room.State.Users.Add(user);

        await _room.WriteStateAsync();

        return true;
    }

    public async Task<bool> OnUserLeave(Guid userId)
    {
        var user = _room.State.Users.Find(x => x.Id == userId);

        if (user == null) return false;

        _room.State.Users.Remove(user);

        await _room.WriteStateAsync();

        return true;
    }
}