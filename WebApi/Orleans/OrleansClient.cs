using Orleans;
using Orleans.Configuration;

namespace WebApi.Orleans;

public interface IOrleansClient
{
    public Task<IClusterClient> GetClient();
}

public class OrleansClient : IOrleansClient
{
    private IClusterClient? _client;

    public async Task<IClusterClient> GetClient()
    {
        if (_client == null)
        {
            await ConnectClient();
        }

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