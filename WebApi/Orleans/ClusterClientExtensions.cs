using GrainInterfaces;
using Orleans;

namespace WebApi.Orleans;

public static class ClusterClientExtensions
{
    public static IRoom GetRoomGrain(this IClusterClient client, Guid roomId)
    {
        return client.GetGrain<IRoom>(roomId);
    }

    public static IRoomManager GetRoomManagerSingleton(this IClusterClient client)
    {
        return client.GetGrain<IRoomManager>(Guid.Empty);
    }

    public static IUser GetUserGrain(this IClusterClient client, Guid userId)
    {
        return client.GetGrain<IUser>(userId);
    }
}