using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Evse.DTO;
using Evse.DTO.auth;
using Evse.Services;
using System.Threading.Tasks;

namespace Evse.Controllers
{
    public class AuthController : ApiControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(
            IAuthService authService
            )
        {
            _authService = authService;
        }
        [HttpPost]
        public async Task<IActionResult> RefreshTokenAsync([FromBody] RefreshTokenViewModel model)
        {
            return StatusCodeResult(await _authService.RefreshTokenAsync(model.token, model.refreshToken));
        }
        [HttpPost]
        public async Task<IActionResult> RefreshTokenLandlordAsync([FromBody] RefreshTokenViewModel model)
        {
            return StatusCodeResult(await _authService.RefreshTokenLandlordAsync(model.token, model.refreshToken));
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> LoginAsync([FromBody] UserForLoginDto model)
        {
            return StatusCodeResult(await _authService.LoginAsync(model));
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> LoginEngineerAsync([FromBody] UserForLoginDto model)
        {
            return StatusCodeResult(await _authService.LoginEngineerAsync(model));
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> LoginLandlordAsync([FromBody] UserForLoginDto model)
        {
            return StatusCodeResult(await _authService.LoginLandlordAsync(model));
        }
        [HttpPost]
        public async Task<IActionResult> LoginRememberAsync([FromBody] UserForLoginRememberDto request)
        {
            return StatusCodeResult(await _authService.LoginAsync(request.ID));
        }
        [HttpPost]
        public async Task<IActionResult> LoginRememberLandlordAsync([FromBody] UserForLoginRememberDto request)
        {
            return StatusCodeResult(await _authService.LoginRememberLandlordAsync(request.ID));
        }

        [HttpPost]
        public async Task<IActionResult> LoginRememberEngineerAsync([FromBody] UserForLoginRememberDto request)
        {
            return StatusCodeResult(await _authService.LoginEngineerAsync(request.ID));
        }

        [HttpPost]
        public async Task<IActionResult> RegisterLandlord([FromBody] RegisterLandlordDto request)
        {
            return StatusCodeResult(await _authService.RegisterLandlord(request));
        }

        [HttpPost]
        public async Task<IActionResult> RegisterEngineer([FromBody] RegisterEngineerDto request)
        {
            return StatusCodeResult(await _authService.RegisterEngineer(request));
        }

        [HttpGet]
        public async Task<IActionResult> ForgotPassword(string email)
        {
            return Ok(await _authService.ForgotPassword(email));
        }

        [HttpPost]
        public async Task<IActionResult> ResetPassword(ResetPasswordDto reset)
        {
            return StatusCodeResult(await _authService.ResetPassword(reset));
        }
        [HttpPost]
        public async Task<IActionResult> ForgotUsername(ForgotUsernameDto forgot)
        {
            return StatusCodeResult(await _authService.ForgotUsername(forgot.email));
        }
        [HttpPost]
        public async Task<IActionResult> LogOutAsync()
        {
            await _authService.LogOut();
            return NoContent();
        }
        [HttpPost]
        public async Task<IActionResult> LogOutLandlordAsync()
        {
            await _authService.LogOutLandlord();
            return NoContent();
        }
        [HttpPost]
        public async Task<IActionResult> LogOutEngineerAsync()
        {
            await _authService.LogOutEngineer();
            return NoContent();
        }
    }

}
