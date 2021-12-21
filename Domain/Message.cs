namespace Domain;

public class Message
{
    public Guid Id { get; set; }
    
    public Guid UserId { get; set; }
    
    public Guid RoomId { get; set; }
    
    public string Content { get; set; }
    
    public DateTime Timestamp { get; set; }
}