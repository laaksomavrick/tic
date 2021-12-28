using WebApi.Hubs;
using WebApi.Orleans;
using WebApi.Swagger;

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(config => { config.DocumentFilter<LowercaseDocumentFilter>(); });

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
    endpoints.MapHub<RoomsHub>("/hub");
    endpoints.MapControllers();
});

app.Run();