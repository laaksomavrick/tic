namespace Domain;

public class Room
{
    public Guid Id { get; set; }

    public string Name { get; set; }

    public List<User> Users { get; set; } = new();

    public List<Message> Messages { get; set; } = new();
}