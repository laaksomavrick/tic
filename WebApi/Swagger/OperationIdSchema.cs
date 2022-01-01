using Microsoft.AspNetCore.Mvc.ApiExplorer;

namespace WebApi.Swagger;

public static class OperationIdSchema {

   public static string GetOperationIdSchema(ApiDescription e)
   {
       return $"{e.ActionDescriptor.RouteValues["controller"]}_{e.ActionDescriptor.RouteValues["action"]}";
   } 

}
    