using System.Threading.Tasks;
using Domain;
using GrainInterfaces;
using Orleans.TestingHost;

namespace Grains.Test.Helpers;

public static class UserGrainTestHelpers
{
    public static async Task<IUser> CreateUserGrain(TestCluster cluster, User user)
    {
        var grain = cluster.GrainFactory.GetGrain<IUser>(user.Id);
        await grain.OnCreateUser(user);
        return grain;
    }
}