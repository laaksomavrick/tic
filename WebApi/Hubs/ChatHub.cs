using Microsoft.AspNetCore.SignalR;
using Orleans;

namespace WebApi.Hubs;

public class ChatHub : Hub
{
    private readonly IClusterClient _client;

    public ChatHub(IClusterClient client)
    {
        _client = client;
    }

    public override async Task OnConnectedAsync()
    {
        // TODO: need to relate a connection to a userId for online/offline status
        await base.OnConnectedAsync();
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        // TODO: need to set user offline
        await base.OnDisconnectedAsync(exception);
    }
}