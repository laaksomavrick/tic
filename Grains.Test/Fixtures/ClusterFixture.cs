using System;
using Orleans.Hosting;
using Orleans.TestingHost;

namespace Grains.Test.Fixtures;

public class ClusterFixture : IDisposable
{
    public ClusterFixture()
    {
        var builder = new TestClusterBuilder()
            .AddSiloBuilderConfigurator<SiloBuilderConfiguration>();
        Cluster = builder.Build();
        Cluster.Deploy();
    }

    public TestCluster Cluster { get; }

    public void Dispose()
    {
        Cluster.StopAllSilos();
    }
}

internal class SiloBuilderConfiguration : ISiloConfigurator
{
    public void Configure(ISiloBuilder siloBuilder)
    {
        siloBuilder.AddMemoryGrainStorage("ticStorage");
    }
}