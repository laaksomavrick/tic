using Application;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Orleans;
using WebApi.DomainTransferObjects;
using WebApi.Hubs;
using WebApi.Orleans;
using WebApi.ViewModels;

namespace WebApi.Controllers;

public class RoomController : ApiController
{
    private readonly IClusterClient _client;
    private readonly IHubContext<ChatHub> _chatHubContext;
    private readonly IRoomService _roomService;


    public RoomController(IClusterClient client, IHubContext<ChatHub> chatHubContext, IRoomService roomService)
    {
        _client = client;
        _chatHubContext = chatHubContext;
        _roomService = roomService;
    }

    [HttpPost]
    public async Task<GetRoomVm> Create([FromBody] CreateRoomDto createRoomDto)
    {
        var name = createRoomDto.Name;
        var room = _roomService.CreateRoom(name);

        var grain = _client.GetRoomGrain(room.Id);

        await grain.OnCreateRoom(room);

        return new GetRoomVm
        {
            Id = room.Id,
            Name = room.Name
        };
    }

    [HttpGet]
    public async Task<IEnumerable<GetRoomVm>> GetAll()
    {
        var grain = _client.GetRoomManagerSingleton();
        var users = await grain.OnGetAllRooms();
        var roomVms = users.Select(x => new GetRoomVm
        {
            Id = x.Id,
            Name = x.Name
        });

        return roomVms;
    }

    [HttpGet("{roomId:guid}/messages")]
    public async Task<IEnumerable<GetMessageVm>> GetAllRoomMessages(Guid roomId)
    {
        var grain = _client.GetRoomGrain(roomId);
        var room = await grain.OnGetRoom();
        var messages = room.Messages;

        var vms = messages.Select(x => new GetMessageVm
        {
            Id = x.Id,
            Message = x.Content,
            Timestamp = x.Timestamp,
            UserId = x.UserId
        });

        return vms;
    }

    [HttpGet("{roomId:guid}/users")]
    public async Task<IEnumerable<GetUserVm>> GetAllRoomUsers(Guid roomId)
    {
        var grain = _client.GetRoomGrain(roomId);
        var room = await grain.OnGetRoom();
        var users = room.Users;

        var vms = users.Select(x => new GetUserVm
        {
            Id = x.Id,
            Username = x.Username
        });

        return vms;
    }

    [HttpPost("{roomId:guid}/join")]
    public async Task<ActionResult> JoinRoom(Guid roomId, JoinRoomDto joinRoomDto)
    {
        var connectionId = joinRoomDto.ConnectionId;
        var userId = joinRoomDto.UserId;

        var grain = _client.GetRoomGrain(roomId);
        var room = await grain.OnGetRoom();
        await grain.OnUserJoin(userId);

        var roomIdString = roomId.ToString();
        var messages = room.Messages.OrderBy(x => x.Timestamp);

        await _chatHubContext.Groups.AddToGroupAsync(connectionId, roomIdString);
        await _chatHubContext.Clients.Group(roomIdString).SendAsync("ReceiveRoomMessages", messages);
        
        return NoContent();
    }
}