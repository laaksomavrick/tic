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
        Console.WriteLine("OnConnectedAsync");
        var userManager = _client.GetUserManagerSingleton();
        var user = await userManager.OnCreateUser(null);
        Context.Items.Add("userId", user.Id);
        await base.OnConnectedAsync();
    }
    
    public override async Task OnDisconnectedAsync(Exception exception)
    {
        var userId = (Guid) (Context.Items["userId"] ?? throw new InvalidOperationException("Socket does not have userId"));
        var userManager = _client.GetUserManagerSingleton();
        await userManager.OnDeleteUser(userId);
        await base.OnDisconnectedAsync(exception);
    }
}