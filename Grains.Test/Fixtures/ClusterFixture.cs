using System;
using System.Linq;
using Orleans.Hosting;
using Orleans.TestingHost;

namespace Grains.Test.Fixtures;

public class ClusterFixture : IDisposable
{
    public TestCluster Cluster { get; private set; } 
    public ClusterFixture()
    {
        var builder = new TestClusterBuilder()
            .AddSiloBuilderConfigurator<SiloBuilderConfiguration>();
        Cluster = builder.Build();
        Cluster.Deploy();
    }

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