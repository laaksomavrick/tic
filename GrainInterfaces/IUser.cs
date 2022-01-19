using Domain;
using Orleans;

namespace GrainInterfaces;

public interface IUser : IGrainWithGuidKey
{
    Task<User> OnGetUser();

    Task OnCreateUser(User user);

    Task OnConnectUser(string connectionId);
    
    Task OnDisconnectUser(string connectionId);

    Task<List<string>> OnGetConnectionIds();
}