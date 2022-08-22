using Microsoft.AspNetCore.Mvc;
using Orleans;
using WebApi.DomainTransferObjects;
using WebApi.Orleans;
using WebApi.ViewModels;

namespace WebApi.Controllers;

public class MessageController : ApiController
{
    
    private readonly IClusterClient _client;
    
    public MessageController(IClusterClient client)
    {
        _client = client;
    }
    
    [HttpPost]
    public async Task<CreateMessageVm> Create([FromBody] CreateMessageDto createMessageDto)
    {
        // See tic-scratch.txt on next steps
        
        var roomId = createMessageDto.RoomId;
        var userId = createMessageDto.UserId;
        var content = createMessageDto.Message;

        var grain = _client.GetRoomGrain(roomId);

        await grain.OnGetRoom();
        var message = await grain.OnMessageCreate(userId, content);

        return new CreateMessageVm
        {
            Id = message.Id,
            RoomId = roomId,
            UserId = userId,
            Message = message.Content,
            Timestamp = message.Timestamp
        };
    }
}