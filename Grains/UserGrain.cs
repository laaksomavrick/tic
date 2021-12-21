using Domain;
using GrainInterfaces;
using Orleans;
using Orleans.Runtime;

namespace Grains;

public class UserGrain : Grain, IUser
{
    private readonly IPersistentState<User> _user;

    public UserGrain([PersistentState("user", "ticStorage")] IPersistentState<User> user)
    {
        _user = user;
    }

    public Task<User> OnGetUser()
    {
        var user = _user.State;
        return Task.FromResult(user);
    }

    public async Task OnCreateUser(User user)
    {
        _user.State = user;
        await _user.WriteStateAsync();
    }
}