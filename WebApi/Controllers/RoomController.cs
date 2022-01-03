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
    private readonly IHubContext<RoomsHub> _roomsHubContext;


    public RoomController(IClusterClient client, IHubContext<RoomsHub> roomsHubContext)
    {
        _client = client;
        _roomsHubContext = roomsHubContext;
    }

    [HttpPost]
    public async Task<GetRoomVm> Create([FromBody] CreateRoomDto createRoomDto)
    {
        // TODO: service
        // var name = createRoomDto.Name;
        // var grain = _client.GetRoomManagerSingleton();
        // var room = await grain.OnCreateRoom(name);
        //
        // return new GetRoomVm
        // {
        //     Id = room.Id,
        //     Username = room.Name
        // };
        return null;
    }

    [HttpGet]
    public async Task<IEnumerable<GetRoomVm>> GetAll()
    {
        var grain = _client.GetRoomManagerSingleton();
        var users = await grain.OnGetAllRooms();
        var roomVms = users.Select(x => new GetRoomVm
        {
            Id = x.Id,
            Username = x.Name
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

        var grain = _client.GetRoomGrain(roomId);
        var room = await grain.OnGetRoom();

        // TODO: what if room does not exist?

        await _roomsHubContext.Groups.AddToGroupAsync(connectionId, roomId.ToString());
        return NoContent();
    }
}