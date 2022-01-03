using Domain;
using Orleans;

namespace GrainInterfaces;

public interface IRoomManager : IGrainWithGuidKey
{
    Task<Room> OnCreateRoom(Room room);

    Task<List<Room>> OnGetAllRooms();
}