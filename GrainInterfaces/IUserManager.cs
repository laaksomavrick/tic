using Domain;
using Orleans;

namespace GrainInterfaces;

public interface IUserManager : IGrainWithGuidKey
{
    Task<User> OnCreateUser(string? name, string connectionId);

    Task<List<User>> OnGetAllUsers();

    Task<User?> OnGetUser(Guid id);
}