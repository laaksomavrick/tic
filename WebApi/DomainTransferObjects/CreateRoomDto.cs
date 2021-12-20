using System.ComponentModel.DataAnnotations;

namespace WebApi.DomainTransferObjects;

public class CreateRoomDto
{
    [Required]
    [MinLength(1)]
    [MaxLength(32)]
    public string Name { get; set; } = string.Empty;
}