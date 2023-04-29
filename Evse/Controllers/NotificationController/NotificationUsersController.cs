
using BFCTicket.Extensions;
using Evse.Constants;
using Evse.DTO;
using Evse.Helpers;
using Evse.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Evse.Controllers
{
    [AllowAnonymous]
    public class NotificationUserController : ApiControllerBase
    {
        private readonly INotificationUserService _service;

        public NotificationUserController(INotificationUserService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult> GetAllAsync()
        {
            return Ok(await _service.GetAllAsync());
        }

        [HttpPost]
        [ValidationModel]
        [HasPermission("PUSH-ALL-DEVICE", HasPermissionConst.CREATE)]

        public async Task<IActionResult> AddAsync([FromBody] NotificationUserDto model)
        {
             
            return StatusCodeResult(await _service.AddAsync(model));
        }

        [HttpPut]
        [ValidationModel]
        [HasPermission("PUSH-ALL-DEVICE", HasPermissionConst.UPDATE)]
        public async Task<IActionResult> UpdateAsync([FromBody] NotificationUserDto model)
        {
             
            return StatusCodeResult(await _service.UpdateAsync(model));
        }

        [HttpDelete]
        [HasPermission("PUSH-ALL-DEVICE", HasPermissionConst.DELETE)]
        public async Task<ActionResult> DeleteAsync(int key)
        {
            return StatusCodeResult(await _service.DeleteAsync(key));
        }

        [HttpGet]
        public async Task<ActionResult> FindByIdAsync(object id)
        {
            return Ok(await _service.GetByIDAsync(id));
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult> PaginationAsync(ParamaterPagination paramater)
        {
            return Ok(await _service.PaginationCustomAsync(paramater));
        }

        // [HttpGet]
        // [HasPermission("PUSH-ALL-DEVICE", HasPermissionConst.READ)]
        // public async Task<ActionResult> LoadDxoGridAsync(DataSourceLoadOptions loadOptions)
        // {
        //     return Ok(await _service.LoadDxoGridAsync(loadOptions));
        // }

        // [HttpGet]
        // public async Task<ActionResult> LoadDxoLookupAsync(DataSourceLoadOptions loadOptions)
        // {
        //     return Ok(await _service.LoadDxoLookupAsync(loadOptions));
        // }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult> GetNotificationUserLoginAsync(int? userReciveId, int offset, int limit)
        {
            return Ok(await _service.GetNotificationUserLoginAsync(userReciveId, offset,limit));
        }

    }
}