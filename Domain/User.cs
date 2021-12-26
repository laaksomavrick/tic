namespace Domain;

public class User
{
    public Guid Id { get; set; }
    
    public string ConnectionId { get; set; } = String.Empty;

    public string Username { get; set; }
}