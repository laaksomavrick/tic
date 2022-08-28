using Application;
using GrainInterfaces;
using WebApi.Hubs;
using WebApi.Orleans;
using WebApi.Swagger;

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;

builder.Services.Configure<RouteOptions>(options => options.LowercaseUrls = true);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(config => { config.CustomOperationIds(OperationIdSchema.GetOperationIdSchema); });

// TODO: extract to AddApplication();
builder.Services.AddSingleton<IUserService, UserService>();
builder.Services.AddSingleton<IRoomService, RoomService>();

builder.Services.AddOrleansClient(configuration);

builder.Services.AddCors(opts =>
{
    opts.AddPolicy("CorsPolicy", builder =>
    {
        builder.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials()
            .WithOrigins("http://localhost:3000"); // TODO: read this from env
    });
});

builder.Services.AddSignalR();

var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseRouting();
app.UseCors("CorsPolicy");


app.UseAuthorization();

app.UseEndpoints(endpoints =>
{
    endpoints.MapHub<ChatHub>("/chathub");
    endpoints.MapControllers();
});

app.Run();