using Domain;
using Microsoft.AspNetCore.SignalR;
using Orleans;
using WebApi.Orleans;

namespace WebApi.Hubs;

// Groups on connect

public class RoomsHub : Hub
{
    private readonly IClusterClient _client;

    public RoomsHub(IClusterClient client)
    {
        _client = client;
    }

    public override async Task OnConnectedAsync()
    {
        Console.WriteLine("HERE");
        var connectionId = Context.ConnectionId;
        var userManager = _client.GetUserManagerSingleton();
        await userManager.OnCreateUser(null, connectionId);
        Console.WriteLine("HERE2" + connectionId);
        await base.OnConnectedAsync();
    }
    
    public override async Task OnDisconnectedAsync(Exception exception)
    {
        await base.OnDisconnectedAsync(exception);
    }
}