using System;
using System.Threading.Tasks;
using FluentAssertions;
using GrainInterfaces;
using Grains.Test.Fixtures;
using NUnit.Framework;
using Orleans.TestingHost;

namespace Grains.Test;

public class UserManagerGrainTests
{
    private TestCluster _cluster;
    
    [SetUp]
    public void Setup()
    {
        _cluster = new ClusterFixture().Cluster;
    }

    [Test]
    public async Task ItCanCreateUsers()
    {
         var grain = _cluster.GrainFactory.GetGrain<IUserManager>(Guid.Empty);
        var firstUsername = "firstUsername";
        var secondUsername = "secondUsername";

        var firstUser = await grain.OnCreateUser(firstUsername);
        var secondUser = await grain.OnCreateUser(secondUsername);

        firstUser.Username.Should().Be(firstUsername);
        secondUser.Username.Should().Be(secondUsername);
        firstUser.Id.Should().NotBe(secondUser.Id);
    }
    
    [Test]
    public async Task ItCanRetrieveUsers()
    {
         var grain = _cluster.GrainFactory.GetGrain<IUserManager>(Guid.Empty);
        var firstUsername = "firstUsername";
        var secondUsername = "secondUsername";

        await grain.OnCreateUser(firstUsername);
        await grain.OnCreateUser(secondUsername);

        var users = await grain.OnGetAllUsers();

        users.Count.Should().Be(2);

        users.Find(x => x.Username == firstUsername).Should().NotBeNull();
        users.Find(x => x.Username == secondUsername).Should().NotBeNull();
    }
}