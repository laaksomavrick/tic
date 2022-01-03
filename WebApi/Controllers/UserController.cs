using Application;
using Microsoft.AspNetCore.Mvc;
using Orleans;
using WebApi.Orleans;
using WebApi.ViewModels;

namespace WebApi.Controllers;

public class UserController : ApiController
{
    private readonly IClusterClient _client;
    private readonly IUserService _userService;

    public UserController(IClusterClient client, IUserService userService)
    {
        _client = client;
        _userService = userService;
    }

    [HttpGet("{userId:guid}")]
    public async Task<GetUserVm> GetOne(Guid userId)
    {
        var grain = _client.GetUserGrain(userId);
        var user = await grain.OnGetUser();

        return new GetUserVm
        {
            Id = user.Id,
            Username = user.Username
        };
    }

    [HttpPost]
    public async Task<CreateUserVm> Create()
    {
        var user = _userService.CreateUser();
        var grain = _client.GetUserGrain(user.Id);
        await grain.OnCreateUser(user);

        return new CreateUserVm
        {
            Id = user.Id,
            Username = user.Username
        };
    }
}