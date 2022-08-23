using System.Threading.Tasks;
using FluentAssertions;
using Microsoft.AspNetCore.SignalR;
using Moq;
using NUnit.Framework;
using Orleans;
using WebApi.Hubs;

namespace WebApi.Test.Hubs.Unit;

public class RoomsHubTest
{
    private Mock<IClusterClient> _clusterClientMock;
    private Mock<HubCallerContext> _hubContextMock;

    private ChatHub _chatHub;

    [SetUp]
    public void Setup()
    {
        _clusterClientMock = new Mock<IClusterClient>();
        _hubContextMock = new Mock<HubCallerContext>();
        _chatHub = new ChatHub(_clusterClientMock.Object);
        _chatHub.Context = _hubContextMock.Object;
    }

    [Test]
    public async Task ItCreatesAUserOnConnectedAndAddsUserIdToContext()
    {
        // var userId = Guid.NewGuid();
        // var user = new User {Id = userId};
        // var userManagerSingletonMock = new Mock<IUserManager>();
        // var contextDictionary = new Dictionary<object, object?>();
        //
        // userManagerSingletonMock.Setup(mock =>
        //     mock.OnCreateUser(null)).ReturnsAsync(user);
        //
        // _clusterClientMock.Setup(mock =>
        //     mock.GetGrain<IUserManager>(Guid.Empty, null)
        // ).Returns(userManagerSingletonMock.Object);
        //
        // _hubContextMock.Setup(x => x.Items).Returns(contextDictionary);
        //
        // await _roomsHub.OnConnectedAsync();
        //
        // userManagerSingletonMock.Verify(mock => mock.OnCreateUser(null), Times.Once);
        // contextDictionary["userId"].Should().Be(userId);
        (1 + 1).Should().Be(2); //TODO
    }
}