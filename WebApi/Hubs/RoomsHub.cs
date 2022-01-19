using System.Transactions;
using Microsoft.AspNetCore.SignalR;
using Orleans;
using WebApi.Orleans;

namespace WebApi.Hubs;

public class RoomsHub : Hub
{
    private readonly IClusterClient _client;

    public RoomsHub(IClusterClient client)
    {
        _client = client;
    }

    public override async Task OnConnectedAsync()
    {
        await base.OnConnectedAsync();
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        var connectionId = Context.ConnectionId;
        var userIdString = (string?) Context.Items["userId"];

        if (userIdString == null)
        {
            await base.OnDisconnectedAsync(exception);
            return;
        }
        
        var userId = Guid.Parse(userIdString);
        var userGrain = _client.GetUserGrain(userId);

        await userGrain.OnDisconnectUser(connectionId);
        await base.OnDisconnectedAsync(exception);
    }

    public async Task OnRegisterUserConnectionAsync(Guid userId)
    {
        var connectionId = Context.ConnectionId;
        var userGrain = _client.GetUserGrain(userId);
        var user = await userGrain.OnGetUser();
        
        await userGrain.OnConnectUser(connectionId);

        var connection = await userGrain.OnGetConnectionIds();
        Context.Items.Add("userId", user.Id);
    }

    public async Task JoinRoom(Guid userId, Guid roomId)
    {
        // TODO...
        // add user to room
        // set up a subscription via orleans roomgrain ?
    }
    
}