using Domain;
using Orleans;

namespace GrainInterfaces;

public interface IRoomManager : IGrainWithGuidKey
{
    Task<Room> OnCreateRoom(string name);

    Task<List<Room>> OnGetAllRooms();
}