using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Evse.Controllers
{
    public class HomeController : Controller
    {
        
         [Route("/thong-bao/{id}")]
         [HttpGet]
        public async Task<IActionResult> Notification(int id)
        {
           // var notification = await _notificationApiClient.FindByIdAsync(id);
            var stringa = await Task.FromResult( JsonConvert.SerializeObject( new {
            Id= 8,
            Title= "✅ What is Lorem Ipsum 🎫🎟",
            NotificationImage= "asset/images/avatar/empty-avatar.png",
            Description= "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s!",
            Content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
            IsSeen= true,
            SendDate= "2022-11-09T21:44:59.594525",
            UserSendId= 1,
            UserReciveId= 2
          }));
            
            return View(stringa);
        }
        
    }
}