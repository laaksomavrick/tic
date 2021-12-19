using Domain;

namespace GrainInterfaces;

public interface IUserManager : Orleans.IGrainWithGuidKey
{
   Task<User> OnCreateUser(string name);
   
   Task<List<User>> OnGetAllUsers();
}