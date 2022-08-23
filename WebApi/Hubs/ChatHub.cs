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
        Console.WriteLine("OnConnectedAsync");
        // var userManager = _client.GetUserManagerSingleton();
        // var user = await userManager.OnCreateUser(null);
        // Context.Items.Add("userId", user.Id);
        await base.OnConnectedAsync();
    }
    
    // OnJoinRoom -> for all members in the room, get the relevant orleans stream and push
    
    // OnSendMessage -> for all members in the room, get the relevant orleans stream and push
    
    // OnReceiveMessage -> for all members in the room, read from the relevant orelans stream
}