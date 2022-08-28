using System;
using System.Threading.Tasks;
using Domain;
using FluentAssertions;
using GrainInterfaces;
using Grains.Common.Exceptions;
using Grains.Test.Fixtures;
using Grains.Test.Helpers;
using Microsoft.Extensions.Configuration.UserSecrets;
using NUnit.Framework;
using Orleans.TestingHost;

namespace Grains.Test;

public class UserGrainTests
{
    private TestCluster _cluster;

    [SetUp]
    public void Setup()
    {
        _cluster = new ClusterFixture().Cluster;
    }


    [Test]
    public async Task ItCanGetAUser()
    {
        var userId = Guid.NewGuid();
        var username = "foo";

        var user = new User
        {
            Id = userId,
            Username = username
        };

        var grain = await UserGrainTestHelpers.CreateUserGrain(_cluster, user);

        var gotUser = await grain.OnGetUser();

        gotUser.Id.Should().Be(userId);
        gotUser.Username.Should().Be(username);
    }

    [Test]
    public async Task ItThrowsWhenUserDoesNotExist()
    {
        var grain = _cluster.GrainFactory.GetGrain<IUser>(Guid.Empty);

        await FluentActions.Invoking(() =>
                grain.OnGetUser()).Should()
            .ThrowAsync<NotFoundException>();
    }
}