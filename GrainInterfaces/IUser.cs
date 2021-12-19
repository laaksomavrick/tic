using Domain;

namespace GrainInterfaces;

public interface IUser : Orleans.IGrainWithIntegerKey
{
   Task<User> OnCreateUser(string name);
   
   Task<List<User>> OnGetAllUsers();
}