using Domain;
using GrainInterfaces;
using Orleans;
using Orleans.Runtime;

namespace Grains;

public class RoomGrain : Grain, IRoom
{
    private readonly IPersistentState<Room> _room;

    public RoomGrain([PersistentState("room", "ticStorage")]IPersistentState<Room> room)
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

    public Task<Message> OnMessageCreate(Guid userId, string content)
    {
        throw new NotImplementedException();
    }

    public Task<bool> OnUserJoin(Guid userId)
    {
        throw new NotImplementedException();
    }

    public Task<bool> OnUserLeave(Guid userId)
    {
        throw new NotImplementedException();
    }
}