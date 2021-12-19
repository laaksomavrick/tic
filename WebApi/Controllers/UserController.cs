using Microsoft.AspNetCore.Mvc;
using WebApi.DomainTransferObjects;
using WebApi.ViewModels;

namespace WebApi.Controllers;

public class UserController : ApiController
{
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
        return new CreateUserVm();
    }
}