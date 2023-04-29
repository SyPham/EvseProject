using AutoMapper;
using Evse.Constants;
using Evse.Data;
using Evse.DTO;
using Evse.Helpers;
using Microsoft.Extensions.Configuration;
using NetUtility;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace Evse.Services
{
    public interface INotificationService
    {
        Task PushNotificationAnonymousAsync(PushNotificationAnonymousDto model);
        Task PushNotificationForOsAsync(string osType,PushNotificationAnonymousDto model);
        Task PushNotificationToTokenAsync(PushNotificationUserDto model);
        Task PushNotificationToTopicAsync(PushNotificationTopic model);
        Task SubscribeTokenToTopicAsync(string topicName, List<string> tokens);
        Task SubscribeTokenToTopicAnonymousAsync( List<string> tokens);
        Task UnSubscribeTokenToTopicAsync(string topicName, List<string> tokens);
    }

    public class NotificationService : INotificationService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly MapperConfiguration _configMapper;
        private readonly IConfiguration _config;
        private OperationResult operationResult;
        string firebaseKey = Environment.GetEnvironmentVariable("FIREBASE_KEY");
        private string topicAnonymous;
        private string topicIos;
        private string topicAndroid;
        public NotificationService(IUnitOfWork unitOfWork, IMapper mapper, MapperConfiguration configMapper, IConfiguration config)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _configMapper = configMapper;
            _config = config;

            var env =Environment.GetEnvironmentVariable("IS_PRODUCT").ToBool();
            if(env)//Môi trường product
            {
                topicAnonymous = TopicFirebaseConst.TOPIC_ANONYMOUS_PRODUCT;
                topicIos = TopicFirebaseConst.TOPIC_IOS_PRODUCT;
                topicAndroid = TopicFirebaseConst.TOPIC_ANDROID_PRODUCT;
            }
            else{
                topicAnonymous = TopicFirebaseConst.TOPIC_ANONYMOUS_UAT;
                 topicIos = TopicFirebaseConst.TOPIC_IOS_UAT;
                topicAndroid = TopicFirebaseConst.TOPIC_ANDROID_UAT;
            }
        }

        public async Task PushNotificationAnonymousAsync(PushNotificationAnonymousDto model)
        {

            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://fcm.googleapis.com/");
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("key", "=" + firebaseKey);


                var obj = new
                {
                    notification = new
                    {
                        title = model.title,
                        body = model.description,
                        click_action = "FLUTTER_NOTIFICATION_CLICK",
                        sound = "default",
                        image= model.imageUrl
                    },
                    data = new
                    {
                        id=model.id,
                        type=model.type,
                        title=model.title,
                        description=model.description,
                        content =model.content,
                        imageUrl = model.imageUrl,
                        targetUrl=model.targetUrl,
                    },
                    priority = "high",
                    to = "/topics/"+topicAnonymous
                };

                var json = obj.ToJsonString();
                HttpContent contentBody = new StringContent(json, Encoding.UTF8, "application/json");
                await client.PostAsync($"fcm/send", contentBody);
            }

        }

        public async Task PushNotificationForOsAsync(string osType, PushNotificationAnonymousDto model)
        {  var env =Environment.GetEnvironmentVariable("IS_PRODUCT").ToBool();
            string topicName=string.Empty;
            if(osType == TopicFirebaseConst.OS_TYPE_IOS){
        
                topicName =topicIos;
            }
            else{
                 topicName =topicAndroid;
            }
            

           using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://fcm.googleapis.com/");
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("key", "=" + firebaseKey);


                var obj = new
                {
                    notification = new
                    {
                        title = model.title,
                        body = model.description,
                        click_action = "FLUTTER_NOTIFICATION_CLICK",
                        sound = "default",
                        image= model.imageUrl
                    },
                    data = new
                    {
                        id=model.id,
                        type=model.type,
                        title=model.title,
                        description=model.description,
                        content =model.content,
                        targetUrl=model.targetUrl,
                    },
                    priority = "high",
                    to = "/topics/"+topicName
                };

                var json = obj.ToJsonString();
                HttpContent contentBody = new StringContent(json, Encoding.UTF8, "application/json");
                await client.PostAsync($"fcm/send", contentBody);
            }
        }

        public async Task PushNotificationToTokenAsync(PushNotificationUserDto model)
        {

            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://fcm.googleapis.com/");
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("key", "=" + firebaseKey);


                var obj = new
                {
                    notification = new
                    {
                        title = model.title,
                        body = model.content,
                        click_action = "FLUTTER_NOTIFICATION_CLICK",
                        sound = "default",
                        image = model.imageUrl
                    },
                    data = new
                    {
                        url = model.targetUrl
                    },
                    priority = "high",
                    to = model.token
                };

                var json = obj.ToJsonString();
                HttpContent contentBody = new StringContent(json, Encoding.UTF8, "application/json");
                await client.PostAsync($"fcm/send", contentBody);
            }

        }

        public async Task PushNotificationToTopicAsync(PushNotificationTopic model)
        {

            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://fcm.googleapis.com/");
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("key", "=" + firebaseKey);


                var obj = new
                {
                    notification = new
                    {
                        title = model.title,
                        body = model.content,
                        click_action = "FLUTTER_NOTIFICATION_CLICK",
                        sound = "default",
                        image = model.imageUrl
                    },
                    data = new
                    {
                        url = model.targetUrl
                    },
                    priority = "high",
                    to = "/topics/" + model.topicName
                };

                var json = obj.ToJsonString();
                HttpContent contentBody = new StringContent(json, Encoding.UTF8, "application/json");
                await client.PostAsync($"fcm/send", contentBody);
            }

        }

        public async Task SubscribeTokenToTopicAnonymousAsync(List<string> tokens)
        {
            await SubscribeTokenToTopicAsync(topicAnonymous, tokens);
        }

        public async Task SubscribeTokenToTopicAsync(string topicName, List<string> tokens)
        {

            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://iid.googleapis.com/");
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("key", "=" + firebaseKey);


                var obj = new
                {
                    to = "/topics/" + topicName,
                    registration_tokens = tokens
                };

                var json = obj.ToJsonString();
                HttpContent contentBody = new StringContent(json, Encoding.UTF8, "application/json");
                await client.PostAsync($"iid/v1:batchAdd", contentBody);
            }
        }

        public async Task UnSubscribeTokenToTopicAsync(string topicName, List<string> tokens)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://iid.googleapis.com/");
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("key", "=" + firebaseKey);


                var obj = new
                {
                    to = "/topics/" + topicName,
                    registration_tokens = tokens
                };

                var json = obj.ToJsonString();
                HttpContent contentBody = new StringContent(json, Encoding.UTF8, "application/json");
                await client.PostAsync($"iid/v1:batchRemove", contentBody);
            }
        }
    }
}