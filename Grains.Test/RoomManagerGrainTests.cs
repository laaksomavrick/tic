using System;
using System.Threading.Tasks;
using FluentAssertions;
using GrainInterfaces;
using Grains.Test.Fixtures;
using NUnit.Framework;
using Orleans.TestingHost;

namespace Grains.Test;

public class RoomManagerGrainTests
{
    private TestCluster _cluster;

    [SetUp]
    public void Setup()
    {
        _cluster = new ClusterFixture().Cluster;
    }

    [Test]
    public async Task ItCanCreateRooms()
    {
        var grain = _cluster.GrainFactory.GetGrain<IRoomManager>(Guid.Empty);
        var firstRoomName = "firstRoomName";
        var secondRoomName = "secondRoomName";

        var firstRoom = await grain.OnCreateRoom(firstRoomName);
        var secondRoom = await grain.OnCreateRoom(secondRoomName);

        firstRoom.Name.Should().Be(firstRoomName);
        secondRoom.Name.Should().Be(secondRoomName);
        secondRoom.Id.Should().NotBe(firstRoom.Id);
    }

    [Test]
    public async Task ItCanRetrieveRooms()
    {
        var grain = _cluster.GrainFactory.GetGrain<IRoomManager>(Guid.Empty);
        var firstRoomName = "firstRoomName";
        var secondRoomName = "secondRoomName";

        await grain.OnCreateRoom(firstRoomName);
        await grain.OnCreateRoom(secondRoomName);

        var rooms = await grain.OnGetAllRooms();

        rooms.Count.Should().Be(2);

        rooms.Find(x => x.Name == firstRoomName).Should().NotBeNull();
        rooms.Find(x => x.Name == secondRoomName).Should().NotBeNull();
    }
}