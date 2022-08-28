using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Orleans;
using WebApi.DomainTransferObjects;
using WebApi.Hubs;
using WebApi.Orleans;
using WebApi.ViewModels;

namespace WebApi.Controllers;

public class MessageController : ApiController
{

    private readonly IClusterClient _client;
    private readonly IHubContext<ChatHub> _chatHubContext;

    public MessageController(IClusterClient client, IHubContext<ChatHub> chatHubContext)
    {
        _client = client;
        _chatHubContext = chatHubContext;
    }

    [HttpPost]
    public async Task<CreateMessageVm> Create(CreateMessageDto createMessageDto)
    {
        var roomId = createMessageDto.RoomId;
        var userId = createMessageDto.UserId;
        var content = createMessageDto.Message;

        var grain = _client.GetRoomGrain(roomId);

        await grain.OnGetRoom();
        var message = await grain.OnMessageCreate(userId, content);

        var createMessageVm = new CreateMessageVm
        {
            Id = message.Id,
            RoomId = roomId,
            UserId = userId,
            Message = message.Content,
            Timestamp = message.Timestamp
        };

        // TODO: does this need to be a method defined in the hub?
        await _chatHubContext.Clients.Group(roomId.ToString()).SendAsync("ReceiveMessage", createMessageVm);

        return createMessageVm;
    }
}