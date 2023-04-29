using System;
using System.Collections.Generic;
using System.Text;

namespace Evse.DTO
{
    public class PushNotificationTopic : PushNotificationAnonymousDto
    {
        public string topicName { get; set; }
    }
       public class SubscribeTokenDto
    {
        public string  TopicName { get; set; }
        public List<string> Tokens { get; set; }
    }
}
