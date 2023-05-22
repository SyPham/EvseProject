using Microsoft.AspNetCore.Mvc;
using Evse.DTO;
using Evse.DTO.auth;
using Evse.Services;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace Evse.Controllers
{
    public class AuthInvestorController : ApiControllerBase
    {
        private readonly IAuthInvestorService _authService;

        public AuthInvestorController(
            IAuthInvestorService authService
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
        [AllowAnonymous]
        public async Task<IActionResult> LoginAsync([FromBody] UserForLoginDto model)
        {
            return StatusCodeResult(await _authService.LoginAsync(model));
        }

       
        [HttpPost]
        public async Task<IActionResult> LoginRememberAsync([FromBody] UserForLoginRememberDto request)
        {
            return StatusCodeResult(await _authService.LoginAsync(request.ID));
        }
       

       

        [HttpGet]
        public async Task<IActionResult> ForgotPassword(string email)
        {
            return Ok(await _authService.ForgotPassword(email));
        }
        [HttpPut]
        public async Task<IActionResult> ChangePassword(ChangePasswordDto request) {
             return StatusCodeResult(await _authService.ChangePassword(request));
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
       
    }

}
