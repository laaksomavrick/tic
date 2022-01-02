// See https://aka.ms/new-console-template for more information

using Grains;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Orleans;
using Orleans.Configuration;
using Orleans.Hosting;

return await RunMainAsync();

static async Task<int> RunMainAsync()
{
    try
    {
        var builder = new ConfigurationBuilder()
            .AddJsonFile("appsettings.json", false, true);
        var config = builder.Build();

        var host = await StartSilo(config);
        Console.WriteLine("\n\n Press Enter to terminate...\n\n");
        Console.ReadLine();

        await host.StopAsync();

        return 0;
    }
    catch (Exception ex)
    {
        Console.WriteLine(ex);
        return 1;
    }
}

static async Task<ISiloHost> StartSilo(IConfigurationRoot config)
{
    var dynamoConfig = config.GetSection("DynamoDB");
    var accessKey = dynamoConfig.GetValue<string>("AccessKey");
    var secretKey = dynamoConfig.GetValue<string>("SecretKey");
    var service = dynamoConfig.GetValue<string>("Service");

    // define the cluster configuration
    var builder = new SiloHostBuilder()
        .UseLocalhostClustering()
        .Configure<ClusterOptions>(options =>
        {
            options.ClusterId = "dev";
            options.ServiceId = "Tic";
        })
        .AddDynamoDBGrainStorage("ticStorage", options =>
        {
            options.UseJson = true;
            options.AccessKey = accessKey;
            options.SecretKey = secretKey;
            options.Service = service;
        })
        .ConfigureApplicationParts(
            parts =>
            {
                parts.AddApplicationPart(typeof(RoomManagerGrain).Assembly).WithReferences();
                parts.AddApplicationPart(typeof(RoomGrain).Assembly).WithReferences();
                parts.AddApplicationPart(typeof(UserGrain).Assembly).WithReferences();
            })
        .ConfigureLogging(logging => logging.AddConsole());

    var host = builder.Build();
    await host.StartAsync();
    return host;
}