using System;
using System.Collections.Generic;
using System.Text;

namespace Evse.DTO
{
    public class PushNotificationAnonymousDto
    {
        public int id { get; set; }
         public NotificationTypeEnum type { get; set; }
        public string title { get; set; }
        public string content { get; set; }
        public string description { get; set; }
        public string imageUrl { get; set; }
        public string targetUrl { get; set; }
    }

    public enum NotificationTypeEnum{
        Anonymous,
        User,
        UpdateApplication,
    }
}
