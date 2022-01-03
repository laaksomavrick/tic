using Microsoft.AspNetCore.SignalR;
using Orleans;

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
        // var userManager = _client.GetUserManagerSingleton();
        // var user = await userManager.OnCreateUser(null);
        // Context.Items.Add("userId", user.Id);
        await base.OnConnectedAsync();
    }
}