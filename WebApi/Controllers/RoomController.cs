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
        return new GetRoomVm();
    }

    [HttpGet]
    public async Task<IEnumerable<GetRoomVm>> GetAll()
    {
        var grain = _client.GetRoomManagerSingleton();
        var users = await grain.OnGetAllRooms();
        var roomVms = users.Select(x => new GetRoomVm()
        {
            Id = x.Id,
            Name = x.Name
        });

        return roomVms;
    }

    [HttpGet("{roomId}/messages")]
    public async Task<List<GetMessageVm>> GetAllRoomMessages(int roomId)
    {
        return new List<GetMessageVm>();
    }

    [HttpGet("{roomId}/users")]
    public async Task<List<GetUserVm>> GetAllRoomUsers(int roomId)
    {
        return new List<GetUserVm>();
    }
}