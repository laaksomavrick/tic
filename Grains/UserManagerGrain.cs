using Domain;
using GrainInterfaces;

namespace Grains;

public class UserManagerGrain : Orleans.Grain, IUserManager
{
    private readonly List<User> _users = new();
    
    public Task<User> OnCreateUser(string name)
    {
        var guid = Guid.NewGuid();
        var user = new User()
        {
            Id = guid,
            Name = name
        };
        
        _users.Add(user);
        
        // TODO: write state

        return Task.FromResult(user);
    }

    public Task<List<User>> OnGetAllUsers()
    {
        return Task.FromResult(_users);
    }
}