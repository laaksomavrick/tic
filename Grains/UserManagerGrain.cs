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

        var userGrain = GrainFactory.GetGrain<IUser>(guid);
        await userGrain.OnCreateUser(user);

        return await Task.FromResult(user);
    }

    public Task<List<User>> OnGetAllUsers()
    {
        var users = _users.State;
        return Task.FromResult(users);
    }

    public Task<User?> OnGetUser(Guid id)
    {
        var users = _users.State;
        var user = users.FirstOrDefault(x => x.Id == id);
        return Task.FromResult(user);
    }

    
}