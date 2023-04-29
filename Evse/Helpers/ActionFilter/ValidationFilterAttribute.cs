using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using System.Reflection;
using Evse.DTO;

namespace BFCTicket.Extensions
{

    //Class parent
    public class ValidationModelAttribute : TypeFilterAttribute
    {
        public ValidationModelAttribute()
            : base(typeof(ValidationFilterAttribute))
        {
            Arguments = new object[] { };
        }
    }

    public class ValidationFilterAttribute: IActionFilter
    {
        public void OnActionExecuted(ActionExecutedContext context)
        {
            
        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
            if ( !context.ModelState.IsValid)
            {
                IEnumerable<string> errorMessages = context.ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage));
                var err = new OperationResult()
                {
                    StatusCode = System.Net.HttpStatusCode.Forbidden,
                    Message = String.Join("\n", errorMessages),
                    Success = false,
                };
                context.Result = ModelStateResult(context);
            }
            else{ //Trim() column in model 
                var models = context.ActionArguments.Values.ToArray()[0];

                //Trim string property
                foreach (PropertyInfo property in models.GetType().GetProperties())
                {
                    if(property.PropertyType==typeof(string))
                    {
                        var proValue = property.GetValue(models, null);
                        if(proValue != null)
                        {
                            property.SetValue(models, proValue.ToString().Trim(), null);
                        }
                    }
                }
            }
        }

        private ObjectResult ModelStateResult(ActionExecutingContext context)
        {
            IEnumerable<string> errorMessages = context.ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage));
            var err = new OperationResult()
            {
                StatusCode = System.Net.HttpStatusCode.BadRequest,
                Message = String.Join("\n", errorMessages),
                Success = false,
            };
            return new BadRequestObjectResult(err);
        }
    }

   

  
   
}