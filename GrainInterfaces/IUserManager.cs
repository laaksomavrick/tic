using Domain;
using Orleans;

namespace GrainInterfaces;

public interface IUserManager : IGrainWithGuidKey
{
    Task<User> OnCreateUser(string? name);

    Task OnDeleteUser(Guid id);

    Task<List<User>> OnGetAllUsers();

    Task<User?> OnGetUser(Guid id);
}