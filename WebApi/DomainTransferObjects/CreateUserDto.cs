using System.ComponentModel.DataAnnotations;

namespace WebApi.DomainTransferObjects;

public class CreateUserDto
{
    [Required]
    [MinLength(1)]
    [MaxLength(32)]
    public string Username { get; set; } = string.Empty;
}