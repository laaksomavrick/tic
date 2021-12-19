using GrainInterfaces;
using Microsoft.AspNetCore.Mvc;
using WebApi.DomainTransferObjects;
using WebApi.Orleans;
using WebApi.ViewModels;

namespace WebApi.Controllers;

public class UserController : ApiController
{

    private readonly IOrleansClient _client;

    public UserController(IOrleansClient client)
    {
        _client = client;
    }

    // Retrieve a list of users
    [HttpGet]
    public async Task<List<GetUserVm>> GetAll()
    {
        return new List<GetUserVm>() { };
    }
    
    // Create a user
    [HttpPost]
    public async Task<CreateUserVm> Create([FromBody] CreateUserDto createUserDto)
    {
        var username = createUserDto.Username; 
        var clusterClient = await _client.GetClient();
        // TODO: better constant than 0
        // guid grains can map to entities e.g. roomcreategrain (singleton ) and roomgrain (representing each entity)
        var grain = clusterClient.GetGrain<IUser>(0);
        var user = await grain.OnCreateUser(username);

        return new CreateUserVm()
        {
            Id = user.Id,
            Username = user.Name
        };
    }
}