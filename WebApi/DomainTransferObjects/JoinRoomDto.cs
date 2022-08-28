namespace WebApi.DomainTransferObjects;

public class JoinRoomDto
{
    public string ConnectionId { get; set; }

    public Guid UserId { get; set; }
}