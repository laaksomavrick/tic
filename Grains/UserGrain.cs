using Domain;
using GrainInterfaces;
using Grains.Common.Exceptions;
using Orleans;
using Orleans.Runtime;

namespace Grains;

public class UserGrain : Grain, IUser
{
    private readonly IPersistentState<User> _user;
    // private readonly IPersistentState<List<string>> _connectionIds; 

    private List<string> _connectionIds = new List<string>();
    public UserGrain(
        [PersistentState("user", "ticStorage")] IPersistentState<User> user
        // [PersistentState("connectionIds", "ticStorage")] IPersistentState<List<string>> connectionIds
        )
    {
        _user = user;
        // _connectionIds = connectionIds;
    }

    public Task<User> OnGetUser()
    {
        var exists = _user.RecordExists;

        if (exists == false) throw new NotFoundException(nameof(User), this.GetPrimaryKey());

        var user = _user.State;
        return Task.FromResult(user);
    }

    public async Task OnCreateUser(User user)
    {
        _user.State = user;
        await _user.WriteStateAsync();
    }

    public Task OnConnectUser(string connectionId)
    {
        _connectionIds.Add(connectionId);
        return Task.CompletedTask;
    }
    
    public Task OnDisconnectUser(string connectionId)
    {
        _connectionIds.Remove(connectionId);
        return Task.CompletedTask;
    }

    public Task<List<string>> OnGetConnectionIds()
    {
        return Task.FromResult(_connectionIds);
    }
}