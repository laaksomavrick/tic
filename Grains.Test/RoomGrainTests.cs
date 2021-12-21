using Grains.Test.Fixtures;
using NUnit.Framework;
using Orleans.TestingHost;

namespace Grains.Test;

public class RoomGrainTests
{
    private TestCluster _cluster;

    [SetUp]
    public void Setup()
    {
        _cluster = new ClusterFixture().Cluster;
    }

    // A room can be created
    // A room can be retrieved 

    // A user can send a message
    // A user can join
    // A user can leave
}