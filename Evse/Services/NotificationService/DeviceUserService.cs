using AutoMapper;
using Evse.Constants;
using Evse.Data;
using Evse.DTO;
using Evse.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using NetUtility;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace Evse.Services
{
    public interface IDeviceUserService
    {
        Task AddOrUpdateDeviceUserAsync(DeviceUserDto model);
    }

    public class DeviceUserService : IDeviceUserService
    {
        private readonly IRepositoryBase<DeviceUser> _repositoryDeviceUsers;
        private readonly INotificationService _notificationService;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly MapperConfiguration _configMapper;
        private readonly IConfiguration _config;
        private OperationResult operationResult;
        public DeviceUserService(IUnitOfWork unitOfWork, IMapper mapper, MapperConfiguration configMapper, IConfiguration config, IRepositoryBase<DeviceUser> repositoryDeviceUsers, INotificationService notificationService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _configMapper = configMapper;
            _config = config;
            _repositoryDeviceUsers = repositoryDeviceUsers;
            _notificationService = notificationService;
        }

        public async Task AddOrUpdateDeviceUserAsync(DeviceUserDto model)
        {
            //Tự động subsrice token vào anonymus topic
            await _notificationService.SubscribeTokenToTopicAnonymousAsync(new List<string> { model.Token });

            var env = Environment.GetEnvironmentVariable("IS_PRODUCT").ToBool();
            string topicIOS = string.Empty;
            string topicAndroid = string.Empty;
            if (env)//Môi trường product
            {
                topicIOS = TopicFirebaseConst.TOPIC_IOS_PRODUCT;;
                topicAndroid = TopicFirebaseConst.TOPIC_ANDROID_PRODUCT;
            }
            else
            {
                topicIOS =TopicFirebaseConst.TOPIC_IOS_UAT;
                topicAndroid =TopicFirebaseConst.TOPIC_ANDROID_UAT;
            }

            //Subscrice luôn vào toppic OS
            if (model.Osname == TopicFirebaseConst.OS_TYPE_IOS)
            {
                await _notificationService.SubscribeTokenToTopicAsync(topicIOS, new List<string> { model.Token });
            }
            else //Os is Android
            {
                await _notificationService.SubscribeTokenToTopicAsync(topicAndroid, new List<string> { model.Token });
            }

            var deviceUser = await _repositoryDeviceUsers.FindAll().AsNoTracking().FirstOrDefaultAsync(x => x.Token == model.Token);
            if (deviceUser != null)
            {
                model.Id = deviceUser.Id;
                model.CreateDate = deviceUser.CreateDate;
                _repositoryDeviceUsers.Update(_mapper.Map<DeviceUser>(model));
            }
            else
            {
                _repositoryDeviceUsers.Add(_mapper.Map<DeviceUser>(model));
            }
            await _unitOfWork.SaveChangeAsync();
        }
    }
}