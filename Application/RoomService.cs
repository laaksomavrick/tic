using Bogus.DataSets;
using Domain;

namespace Application;

public interface IRoomService
{
    public Room CreateRoom(string name);
}

public class RoomService : IRoomService
{
    public Room CreateRoom(string name)
    {

        var id = Guid.NewGuid();

        var room = new Room()
        {
            Id = id,
            Name = name,
            Messages = new List<Message>(),
            Users = new List<User>()
        };

        return room;
    }
}