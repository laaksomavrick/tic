using Microsoft.AspNetCore.Mvc;
using Orleans;
using WebApi.DomainTransferObjects;
using WebApi.Orleans;
using WebApi.ViewModels;

namespace WebApi.Controllers;

public class UserController : ApiController
{
    private readonly IClusterClient _client;

    public UserController(IClusterClient client)
    {
        _client = client;
    }

    // Retrieve a list of users
    [HttpGet]
    public async Task<IEnumerable<GetUserVm>> GetAll()
    {
        var grain = _client.GetUserManagerSingleton();
        var users = await grain.OnGetAllUsers();
        var userVms = users.Select(x => new GetUserVm
        {
            Id = x.Id,
            Username = x.Username
        });

        return userVms;
    }

    // Create a user
    [HttpPost]
    public async Task<CreateUserVm> Create([FromBody] CreateUserDto createUserDto)
    {
        var username = createUserDto.Username;
        var grain = _client.GetUserManagerSingleton();
        var user = await grain.OnCreateUser(username);

        return new CreateUserVm
        {
            Id = user.Id,
            Username = user.Username
        };
    }
}