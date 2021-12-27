using System;
using System.Threading.Tasks;
using GrainInterfaces;
using Orleans.TestingHost;

namespace Grains.Test.Helpers;

public static class UserGrainTestHelpers
{
    public static async Task<IUser> CreateUserGrain(TestCluster cluster, string name)
    {
        var userManagerGrain = cluster.GrainFactory.GetGrain<IUserManager>(Guid.Empty);
        var user = await userManagerGrain.OnCreateUser(name); 
        var grain = cluster.GrainFactory.GetGrain<IUser>(user.Id);
        return grain;
    }
}