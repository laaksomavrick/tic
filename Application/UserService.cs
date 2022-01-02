using Bogus;
using Domain;

namespace Application;

public interface IUserService
{
    public User CreateUser();
}

public class UserService : IUserService
{
    private readonly Faker _faker = new Faker("en");
    
    public User CreateUser()
    {
        var id = Guid.NewGuid();
        var username = _faker.Internet.UserName();

        var user = new User()
        {
            Id = id,
            Username = username
        };

        return user;
    }
}