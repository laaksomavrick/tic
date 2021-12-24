using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using GrainInterfaces;
using Orleans.TestingHost;

namespace Grains.Test.Helpers;

public static class RoomGrainTestHelpers
{
    public static async Task<IRoom> CreateRoomGrain(TestCluster cluster, Guid id, string name)
    {
        var grain = cluster.GrainFactory.GetGrain<IRoom>(id);

        var room = new Room
        {
            Id = id,
            Name = name,
            Users = new List<User>(),
            Messages = new List<Message>()
        };

        await grain.OnCreateRoom(room);

        return grain;
    }
}