namespace WebApi.ViewModels;

public class GetUserVm
{
    public Guid Id { get; set; } = Guid.Empty;
    
    public string Username { get; set; } = string.Empty;
}