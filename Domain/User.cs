namespace Domain;

public class User
{
    public Guid Id { get; set; }

    public string Username { get; set; } = string.Empty;

    public List<Guid> JoinedRoomIds { get; set; } = new List<Guid>();
}