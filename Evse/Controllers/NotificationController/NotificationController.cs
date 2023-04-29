
using Evse.DTO;
using Evse.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Evse.Controllers
{
    [AllowAnonymous]
    public class NotificationController : ApiControllerBase
    {
        private readonly INotificationService _notificationService;

        public NotificationController(INotificationService NotificationService)
        {
            _notificationService = NotificationService;
        }

        [HttpPost]
        public async Task<ActionResult> PushNotificationAnonymousAsync([FromBody]PushNotificationAnonymousDto model)
        {
            await _notificationService.PushNotificationAnonymousAsync(model);
            return Ok();
        }

        [HttpPost]
        public async Task<ActionResult> PushNotificationToTokenAsync([FromBody] PushNotificationUserDto model)
        {
            await _notificationService.PushNotificationToTokenAsync(model);
            return Ok();
        }
        [HttpPost]
        public async Task<ActionResult> PushNotificationToTopicAsync([FromBody] PushNotificationTopic model)
        {
            await _notificationService.PushNotificationToTopicAsync(model);
            return Ok();
        }

        [HttpPost]
        public async Task<ActionResult> SubscribeTokenToTopicAsync([FromBody] SubscribeTokenDto model)
        {
            await _notificationService.SubscribeTokenToTopicAsync(model.TopicName,model.Tokens);
            return Ok();
        }

        [HttpPost]
        public async Task<ActionResult> UnSubscribeTokenToTopicAsync([FromBody] SubscribeTokenDto model)
        {
            await _notificationService.UnSubscribeTokenToTopicAsync(model.TopicName, model.Tokens);
            return Ok();
        }
    }
}