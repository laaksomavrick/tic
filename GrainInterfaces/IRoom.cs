using Domain;
using Orleans;

namespace GrainInterfaces;

public interface IRoom : IGrainWithGuidKey
{
    Task<Room> OnGetRoom();
    
    Task OnCreateRoom(Room room);
    
    Task<Message> OnMessageCreate(Guid userId, string content);

    Task<bool> OnUserJoin(Guid userId);
    
    Task<bool> OnUserLeave(Guid userId);
}