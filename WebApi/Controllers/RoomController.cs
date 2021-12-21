using Microsoft.AspNetCore.Mvc;
using Orleans;
using WebApi.DomainTransferObjects;
using WebApi.Orleans;
using WebApi.ViewModels;

namespace WebApi.Controllers;

public class RoomController : ApiController
{
    private readonly IClusterClient _client;

    public RoomController(IClusterClient client)
    {
        _client = client;
    }

    [HttpPost]
    public async Task<GetRoomVm> Create([FromBody] CreateRoomDto createRoomDto)
    {
        var name = createRoomDto.Name;
        var grain = _client.GetRoomManagerSingleton();
        var room = await grain.OnCreateRoom(name);

        return new GetRoomVm
        {
            Id = room.Id,
            Username = room.Name
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
            Username = x.Name
        });

        return roomVms;
    }

    [HttpGet("{roomId}/messages")]
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

    [HttpGet("{roomId}/users")]
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
}