namespace WebApi.ViewModels;

public class GetMessageVm
{
    public Guid Id { get; set; } = Guid.Empty;
    
    public Guid RoomId { get; set; } = Guid.Empty;
    
    public Guid UserId { get; set; } = Guid.Empty;
    
    public string Message { get; set; } = string.Empty;
    
    public DateTime Timestamp { get; set; }
}