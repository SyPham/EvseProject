using System;
using System.Collections.Generic;
using System.Text;

namespace Evse.DTO
{
    public class PushNotificationUserDto: PushNotificationAnonymousDto
    {
        public string token { get; set; }
    }
}
