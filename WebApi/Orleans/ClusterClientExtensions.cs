using GrainInterfaces;
using Orleans;

namespace WebApi.Orleans;

public static class ClusterClientExtensions
{
    public static IUserManager GetUserManagerSingleton(this IClusterClient client)
    {
        return client.GetGrain<IUserManager>(Guid.Empty);
    }
}