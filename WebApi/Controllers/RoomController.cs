using Microsoft.AspNetCore.Mvc;
using WebApi.DomainTransferObjects;
using WebApi.ViewModels;

namespace WebApi.Controllers;

public class RoomController : ApiController
{
    [HttpPost]
    public async Task<GetRoomVm> Create([FromBody] CreateRoomDto createRoomDto)
    {
        return new GetRoomVm();
    }

    [HttpGet]
    public async Task<List<GetRoomVm>> GetAll()
    {
        return new List<GetRoomVm>();
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