using Domain;
using Orleans;

namespace GrainInterfaces;

public interface IUser : IGrainWithGuidKey
{
    Task<User> OnGetUser();

    Task OnCreateUser(User user);

    Task OnJoinRoom(Guid roomId);
}