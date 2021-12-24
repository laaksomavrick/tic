namespace Grains.Common.Exceptions;

public class NotFoundException : Exception
{
    public NotFoundException() : base("Entity was not found.") {}
    public NotFoundException(string resource, dynamic id) : base($"{resource}=${id} was not found.") {}
}