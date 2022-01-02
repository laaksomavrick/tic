using Domain;
using GrainInterfaces;
using Orleans;
using Orleans.Runtime;

namespace Grains;

public class RoomManagerGrain : Grain, IRoomManager
{
    private readonly IPersistentState<List<Room>> _rooms;

    public RoomManagerGrain([PersistentState("rooms", "ticStorage")] IPersistentState<List<Room>> rooms)
    {
        _rooms = rooms;
    }

    public async Task<Room> OnCreateRoom(Room room)
    {
        _rooms.State.Add(room);
        
        await _rooms.WriteStateAsync();
        
        return room;
    }

    public Task<List<Room>> OnGetAllRooms()
    {
        var rooms = _rooms.State;
        return Task.FromResult(rooms);
    }
}