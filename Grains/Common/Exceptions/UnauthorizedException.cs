namespace Grains.Common.Exceptions;

public class UnauthorizedException : Exception
{
    public UnauthorizedException() : base("An authorization error has occurred") {}
    public UnauthorizedException(string message) : base(message) {}
}