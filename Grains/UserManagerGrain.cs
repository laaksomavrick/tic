using Domain;
using GrainInterfaces;
using Orleans;
using Orleans.Runtime;

namespace Grains;

public class UserManagerGrain : Grain, IUserManager
{
    private readonly IPersistentState<List<User>> _users;

    public UserManagerGrain(
        [PersistentState("users", "ticStorage")]
        IPersistentState<List<User>> users)
    {
        _users = users;
    }

    public async Task<User> OnCreateUser(string name)
    {
        var guid = Guid.NewGuid();
        var user = new User
        {
            Id = guid,
            Username = name
        };

        _users.State.Add(user);

        await _users.WriteStateAsync();

        return await Task.FromResult(user);
    }

    public Task<List<User>> OnGetAllUsers()
    {
        var users = _users.State;
        return Task.FromResult(users);
    }
}