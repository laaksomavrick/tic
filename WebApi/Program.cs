using WebApi.Orleans;
using WebApi.Swagger;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(config =>
{
    config.DocumentFilter<LowercaseDocumentFilter>();
});

builder.Services.AddSingleton<IOrleansClient, OrleansClient>();

var app = builder.Build();

// TODO better way to do this such that downstream doesn't always ahve to call getCLient
// e.g. async di blah blah
await app.Services.GetService<IOrleansClient>().GetClient();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();