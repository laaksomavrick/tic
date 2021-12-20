using Domain;
using Orleans;

namespace GrainInterfaces;

public interface IUserManager : IGrainWithGuidKey
{
    Task<User> OnCreateUser(string name);

    Task<List<User>> OnGetAllUsers();
}