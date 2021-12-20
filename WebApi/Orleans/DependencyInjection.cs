namespace WebApi.Orleans;

public static class DependencyInjection
{
    public static IServiceCollection AddOrleansClient(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddSingleton<IOrleansClusterClientFactory, OrleansClusterClientFactory>();
        services.AddSingleton(provider =>
            {
                var client = provider.GetRequiredService<IOrleansClusterClientFactory>();
                var clusterClient = client.GetClient();
                return clusterClient;
            }
        );

        return services;
    }
}