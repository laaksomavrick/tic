using Orleans;
using Orleans.Configuration;

namespace WebApi.Orleans;

public interface IOrleansClusterClientFactory
{
    public IClusterClient GetClient();
}

public class OrleansClusterClientFactory : IOrleansClusterClientFactory
{
    private IClusterClient _client;

    public OrleansClusterClientFactory()
    {
        ConnectClient().Wait();
    }

    public IClusterClient GetClient()
    {
        return _client;
    }
    
    private async Task<IClusterClient> ConnectClient()
    {
        _client = new ClientBuilder()
            .UseLocalhostClustering()
            .Configure<ClusterOptions>(options =>
            {
                options.ClusterId = "dev";
                options.ServiceId = "Tic";
            })
            .ConfigureLogging(logging => logging.AddConsole())
            .Build();

        await _client.Connect();
        Console.WriteLine("Client successfully connected to silo host \n");
        return _client;
    } 
}