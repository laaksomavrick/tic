using System;
using System.Threading.Tasks;
using Domain;
using FluentAssertions;
using Grains.Common.Exceptions;
using Grains.Test.Fixtures;
using Grains.Test.Helpers;
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

    [Test]
    public async Task ItCanBeCreated()
    {
        var roomId = Guid.NewGuid();
        var roomName = "foo";
        var grain = await RoomGrainTestHelpers.CreateRoomGrain(_cluster, roomId, roomName);
        var room = await grain.OnGetRoom();

        room.Id.Should().Be(roomId);
        room.Name.Should().Be(roomName);
    }

    [Test]
    public async Task AUserInRoomCanSendAMessage()
    {
        var user = new User
        {
            Id = Guid.NewGuid(),
            Username = "bar"
        };

        var roomId = Guid.NewGuid();
        var roomName = "foo";

        var message = "my message";

        await UserGrainTestHelpers.CreateUserGrain(_cluster, user);
        var grain = await RoomGrainTestHelpers.CreateRoomGrain(_cluster, roomId, roomName);

        await grain.OnUserJoin(user.Id);
        await grain.OnMessageCreate(user.Id, message);

        var room = await grain.OnGetRoom();

        room.Messages.Count.Should().Be(1);
    }

    [Test]
    public async Task AUserNotInRoomCannotSendAMessage()
    {
        var user = new User
        {
            Id = Guid.NewGuid(),
            Username = "bar"
        };

        var roomId = Guid.NewGuid();
        var roomName = "foo";

        var message = "my message";

        await UserGrainTestHelpers.CreateUserGrain(_cluster, user);
        var grain = await RoomGrainTestHelpers.CreateRoomGrain(_cluster, roomId, roomName);

        await grain.OnUserJoin(user.Id);

        await FluentActions.Invoking(() =>
                grain.OnMessageCreate(Guid.NewGuid(), message)).Should()
            .ThrowAsync<UnauthorizedException>();
    }

    [Test]
    public async Task AUserCanJoinARoom()
    {
        var user = new User
        {
            Id = Guid.NewGuid(),
            Username = "bar"
        };

        var roomId = Guid.NewGuid();
        var roomName = "foo";

        await UserGrainTestHelpers.CreateUserGrain(_cluster, user);
        var grain = await RoomGrainTestHelpers.CreateRoomGrain(_cluster, roomId, roomName);

        await grain.OnUserJoin(user.Id);

        var room = await grain.OnGetRoom();

        room.Users.Count.Should().Be(1);
    }

    [Test]
    public async Task AUserCanJoinARoomTheyAreIn()
    {
        var user = new User
        {
            Id = Guid.NewGuid(),
            Username = "bar"
        };

        var roomId = Guid.NewGuid();
        var roomName = "foo";

        await UserGrainTestHelpers.CreateUserGrain(_cluster, user);
        var grain = await RoomGrainTestHelpers.CreateRoomGrain(_cluster, roomId, roomName);

        await grain.OnUserJoin(user.Id);
        await grain.OnUserJoin(user.Id);
        var room = await grain.OnGetRoom();

        room.Users.Count.Should().Be(1);
    }

    [Test]
    public async Task AUserThatDoesNotExistCannotJoinRoom()
    {
        var user = new User
        {
            Id = Guid.NewGuid(),
            Username = "bar"
        };

        var roomId = Guid.NewGuid();
        var roomName = "foo";

        await UserGrainTestHelpers.CreateUserGrain(_cluster, user);
        var grain = await RoomGrainTestHelpers.CreateRoomGrain(_cluster, roomId, roomName);

        await FluentActions.Invoking(() =>
                grain.OnUserJoin(Guid.NewGuid())).Should()
            .ThrowAsync<NotFoundException>();
    }

    [Test]
    public async Task AUserCanLeaveARoom()
    {
        var user = new User
        {
            Id = Guid.NewGuid(),
            Username = "bar"
        };

        var roomId = Guid.NewGuid();
        var roomName = "foo";

        var userGrain = await UserGrainTestHelpers.CreateUserGrain(_cluster, user);
        var grain = await RoomGrainTestHelpers.CreateRoomGrain(_cluster, roomId, roomName);


        await grain.OnUserJoin(user.Id);
        await grain.OnUserLeave(user.Id);

        var room = await grain.OnGetRoom();

        room.Users.Count.Should().Be(0);
    }

    [Test]
    public async Task AUserThatIsNotInRoomCannotLeaveRoom()
    {
        var roomId = Guid.NewGuid();
        var roomName = "foo";

        var grain = await RoomGrainTestHelpers.CreateRoomGrain(_cluster, roomId, roomName);

        await FluentActions.Invoking(() =>
                grain.OnUserLeave(Guid.NewGuid())).Should()
            .ThrowAsync<NotFoundException>();
    }
}