using Microsoft.AspNetCore.Mvc;
using WebApi.DomainTransferObjects;
using WebApi.ViewModels;

namespace WebApi.Controllers;

public class MessageController : ApiController
{
   [HttpPost]
   public async Task<CreateMessageVm> Create([FromBody] CreateMessageDto createMessageDto)
   {
       return new CreateMessageVm();
   }
}