
using Evse.DTO;
using Evse.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Evse.Controllers
{
    [AllowAnonymous]
    public class DeviceUserController : ApiControllerBase
    {
        private readonly IDeviceUserService _deviceUserService;

        public DeviceUserController(IDeviceUserService deviceUserService)
        {
            _deviceUserService = deviceUserService;
        }

       
        [HttpPost]
        public async Task<ActionResult> AddOrUpdateDeviceUserAsync([FromBody] DeviceUserDto model)
        {
            await _deviceUserService.AddOrUpdateDeviceUserAsync(model);
            return Ok();
        }
    }
}