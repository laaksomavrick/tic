using System.ComponentModel.DataAnnotations;

namespace WebApi.DomainTransferObjects;

public class CreateMessageDto
{
    [Required]
    public string Message { get; set; } = string.Empty;
    
    [Required]
    public Guid RoomId { get; set; } = Guid.Empty;
    
    [Required]
    public Guid UserId { get; set; } = Guid.Empty;
}