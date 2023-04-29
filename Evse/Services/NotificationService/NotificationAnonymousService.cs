//using AutoMapper;
//using Evse.DTO;
//using Evse.AutoMapper.ViewModel;
//using Evse.Data.EF.Interface;
//using Evse.Data.Entities.Notification;
//using Evse.Utilities;
//using Evse.Utilities.Dtos;
//using Microsoft.EntityFrameworkCore;
//using Microsoft.Extensions.Configuration;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Net.Http;
//using System.Net.Http.Headers;
//using System.Text;
//using System.Threading;
//using System.Threading.Tasks;

//namespace Evse.Services
//{
//    public interface INotificationAnonymousService : IBaseService<NotificationAnonymousViewModel>
//    {

//    }

//    public class NotificationAnonymousService : BaseService<NotificationAnonymous, NotificationAnonymousViewModel>, INotificationAnonymousService
//    {
//        private readonly IRepository<NotificationAnonymous> _repository;
//        private readonly INotificationService _notificationService;
//        private readonly IUnitOfWork _unitOfWork;
//        private readonly IMapper _mapper;
//        private readonly MapperConfiguration _configMapper;
//        private readonly IConfiguration _config;
//        private OperationResult operationResult;
//        public NotificationAnonymousService(IUnitOfWork unitOfWork, IMapper mapper, MapperConfiguration configMapper, IConfiguration config, IRepository<NotificationAnonymous> repository, INotificationService notificationService)
//        : base(repository, unitOfWork, mapper, configMapper)
//        {
//            _unitOfWork = unitOfWork;
//            _mapper = mapper;
//            _configMapper = configMapper;
//            _config = config;
//            _repository = repository;
//            _notificationService = notificationService;
//        }

//        public override async Task<OperationResult> AddAsync(NotificationAnonymousViewModel model)
//        {
//            var addNotification = await base.AddAsync(model);
//            if (addNotification.Success)
//            {
//                Thread thread = new Thread(async  () => {
//                    var modelPush = new PushNotificationAnonymousDto
//                    {
//                        title=model.Title,
//                        content = model.Decription,
//                        imageUrl = model.NotificationImage
//                    };
//                    await _notificationService.PushNotificationAnonymousAsync(modelPush);
//                });
//                thread.Start(); // start thread mới
               
//            }
//            return addNotification;
//        }


//    }
//}