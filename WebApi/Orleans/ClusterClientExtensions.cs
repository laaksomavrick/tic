using GrainInterfaces;
using Orleans;

namespace WebApi.Orleans;

public static class ClusterClientExtensions
{
    public static IUserManager GetUserManagerSingleton(this IClusterClient client)
    {
        return client.GetGrain<IUserManager>(Guid.Empty);
    }

    public static IRoomManager GetRoomManagerSingleton(this IClusterClient client)
    {
        return client.GetGrain<IRoomManager>(Guid.Empty);
    }

    public static IRoom GetRoomGrain(this IClusterClient client, Guid roomId)
    {
        return client.GetGrain<IRoom>(roomId);
    }
}