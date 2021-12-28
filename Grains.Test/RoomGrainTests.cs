using System;
using System.Threading.Tasks;
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
        var userName = "bar";

        var roomId = Guid.NewGuid();
        var roomName = "foo";

        var message = "my message";

        var userGrain = await UserGrainTestHelpers.CreateUserGrain(_cluster, userName);
        var grain = await RoomGrainTestHelpers.CreateRoomGrain(_cluster, roomId, roomName);

        var user = await userGrain.OnGetUser();
        var userId = user.Id;

        await grain.OnUserJoin(userId);
        await grain.OnMessageCreate(userId, message);

        var room = await grain.OnGetRoom();

        room.Messages.Count.Should().Be(1);
    }

    [Test]
    public async Task AUserNotInRoomCannotSendAMessage()
    {
        var userName = "bar";

        var roomId = Guid.NewGuid();
        var roomName = "foo";

        var message = "my message";

        var userGrain = await UserGrainTestHelpers.CreateUserGrain(_cluster, userName);
        var grain = await RoomGrainTestHelpers.CreateRoomGrain(_cluster, roomId, roomName);

        var user = await userGrain.OnGetUser();
        var userId = user.Id;

        await grain.OnUserJoin(userId);

        await FluentActions.Invoking(() =>
                grain.OnMessageCreate(Guid.NewGuid(), message)).Should()
            .ThrowAsync<UnauthorizedException>();
    }

    [Test]
    public async Task AUserCanJoinARoom()
    {
        var userName = "bar";

        var roomId = Guid.NewGuid();
        var roomName = "foo";

        var userGrain = await UserGrainTestHelpers.CreateUserGrain(_cluster, userName);
        var grain = await RoomGrainTestHelpers.CreateRoomGrain(_cluster, roomId, roomName);

        var user = await userGrain.OnGetUser();
        var userId = user.Id;

        await grain.OnUserJoin(userId);

        var room = await grain.OnGetRoom();

        room.Users.Count.Should().Be(1);
    }

    [Test]
    public async Task AUserThatDoesNotExistCannotJoinRoom()
    {
        var userName = "bar";

        var roomId = Guid.NewGuid();
        var roomName = "foo";

        await UserGrainTestHelpers.CreateUserGrain(_cluster, userName);
        var grain = await RoomGrainTestHelpers.CreateRoomGrain(_cluster, roomId, roomName);

        await FluentActions.Invoking(() =>
                grain.OnUserJoin(Guid.NewGuid())).Should()
            .ThrowAsync<NotFoundException>();
    }

    [Test]
    public async Task AUserCanLeaveARoom()
    {
        var userName = "bar";

        var roomId = Guid.NewGuid();
        var roomName = "foo";

        var userGrain = await UserGrainTestHelpers.CreateUserGrain(_cluster, userName);
        var grain = await RoomGrainTestHelpers.CreateRoomGrain(_cluster, roomId, roomName);

        var user = await userGrain.OnGetUser();
        var userId = user.Id;

        await grain.OnUserJoin(userId);
        await grain.OnUserLeave(userId);

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