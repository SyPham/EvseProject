using AutoMapper;
using AutoMapper.QueryableExtensions;
using Evse.Data;
using Evse.DTO;
using Evse.Helpers;
using Evse.Models;
using Evse.Services.Base;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using NetUtility;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Evse.Services
{
    public interface INotificationUserService : IServiceBase<NotificationUser,NotificationUserDto>
    {
        Task<Pager<NotificationUserDto>> PaginationCustomAsync(ParamaterPagination paramater);
        Task<List<NotificationUserDto>> GetNotificationUserLoginAsync(int? userReciveId, int offset, int limit);
    }

    public class NotificationUserService : ServiceBase<NotificationUser, NotificationUserDto>, INotificationUserService
    {
        private readonly IRepositoryBase<NotificationUser> _repository;
        private readonly INotificationService _notificationService;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly MapperConfiguration _configMapper;
        private readonly IConfiguration _config;
        private OperationResult operationResult;
        public readonly IHttpContextAccessor _contextAccessor;
        private readonly IEvseLoggerService  _logger;
        private readonly ILogger<NotificationUserService>  _logger2;
        public NotificationUserService(IUnitOfWork unitOfWork, IMapper mapper, MapperConfiguration configMapper, IConfiguration config, IRepositoryBase<NotificationUser> repository, IHttpContextAccessor contextAccessor, INotificationService notificationService, IEvseLoggerService logger, ILogger<NotificationUserService> logger2)
        : base(repository, logger, unitOfWork, mapper, configMapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _configMapper = configMapper;
            _config = config;
            _repository = repository;
            _contextAccessor = contextAccessor;
            _notificationService = notificationService;
            _logger = logger;
            _logger2 = logger2;
        }

        public override async Task<OperationResult> AddAsync(NotificationUserDto model)
        {
            model.SendDate = DateTime.Now;
            model.UserSendId = _contextAccessor.HttpContext.User.GetUserId();
            var resultAdd = await base.AddAsync(model);
            if (resultAdd.Success)
            {
                System.Reflection.PropertyInfo pi = resultAdd.Data.GetType().GetProperty("Id");
                int id = (int)(pi.GetValue(resultAdd.Data, null));

                if (model.UserReciveId == null)//Người nhận null là push anonymous
                {
                    Thread thread = new Thread(async () =>
                    {
                        var urlImage = model.NotificationImage;
                        if (!urlImage.IsNullOrEmpty() && !urlImage.Contains("http"))
                        {
                            urlImage = Environment.GetEnvironmentVariable("API_DOMAIN_URL") + "/" + model.NotificationImage;
                        }

                        var modelPush = new PushNotificationAnonymousDto
                        {
                            id = id,
                            type = NotificationTypeEnum.Anonymous,
                            title = model.Title,
                            description = model.Description.Left(150),
                            imageUrl = urlImage
                        };
                        _logger2.LogInformation(modelPush.ToJsonString());

                        await _notificationService.PushNotificationAnonymousAsync(modelPush);
                    });
                    thread.Start(); // start thread mới
                }
            }
            return resultAdd;
        }
        public async  Task<Pager<NotificationUserDto>> PaginationCustomAsync(ParamaterPagination paramater)
        {
            var query = _repository.FindAll().AsNoTracking().OrderByDescending(x=>x.SendDate).ProjectTo<NotificationUserDto>(_configMapper);

            return await query.ToPaginationAsync(paramater.page, paramater.pageSize);
        }
        public async Task<List<NotificationUserDto>> GetNotificationUserLoginAsync(int? userReciveId, int offset, int limit)
        {
            //userReciveId = userReciveId == 0 ? null : userReciveId;
            var notifications = await _repository.FindAll()
                .Where(x => x.UserReciveId == userReciveId)
                .OrderByDescending(x => x.SendDate)
               .Skip(offset).Take(limit).ToListAsync();
            return _mapper.Map<List<NotificationUserDto>>(notifications);
        }
    }
}