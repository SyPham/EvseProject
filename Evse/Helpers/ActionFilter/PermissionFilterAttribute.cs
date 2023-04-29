
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Evse.DTO;
using Evse.Services;

namespace Evse.Helpers
{

    //Class parent
    public class HasPermissionAttribute : TypeFilterAttribute
    {
        public HasPermissionAttribute(string function, string action)
            : base(typeof(HasPermissionAsyncFilter))
        {
            Arguments = new object[] { function, action };
        }
    }

    //Excute class
    public class HasPermissionAsyncFilter : IAsyncActionFilter
    {
        private readonly string _function;
        private readonly string _action;
        private readonly IXAccountPermissionService _permissionService;

        public HasPermissionAsyncFilter(string function, string action, IXAccountPermissionService permissionService)
        {
            _function = function;
            _action = action;
            _permissionService = permissionService;
        }

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {

            var roles = context.HttpContext.User.GetRolesValue().ToArray();
            //Check admin permissions
            var isAdmin = roles.Any(role => role == "Admin");
            if (!isAdmin)
            {
                var isCheck = await _permissionService.CheckPermissionAsync(_function, _action, roles);
                if (!isCheck)
                {
                    var err = new OperationResult()
                    {
                        StatusCode = System.Net.HttpStatusCode.Forbidden,
                        Message = "Don't has permission!",
                        Success = false,

                    };
                    //var resultContext = await next();
                    context.Result = new ForbiddenObjectResult(err);
                }
                else await next();
            }
            else await next();
        }
    }

    //ObjectResult
    public class ForbiddenObjectResult : ObjectResult
    {
        public ForbiddenObjectResult(object value)
                : base(value)
        {
            StatusCode = StatusCodes.Status403Forbidden;
        }
    }


}
