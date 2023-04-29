using AutoMapper;
using Evse.Data;
using Evse.DTO;
using Evse.Models;
using Evse.Services.Base;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace Evse.Services
{
    public interface ITopicUserService : IServiceBase<TopicUser,TopicUserDto>
    {
       
    }

    public class TopicUserService : ServiceBase<TopicUser, TopicUserDto>, ITopicUserService
    {
        private readonly IRepositoryBase<TopicUser> _repository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly MapperConfiguration _configMapper;
        private readonly IConfiguration _config;
        private OperationResult operationResult;
        private readonly IEvseLoggerService  _logger;

        public TopicUserService(IUnitOfWork unitOfWork, IMapper mapper, MapperConfiguration configMapper, IConfiguration config, IRepositoryBase<TopicUser> repository, IEvseLoggerService logger)
        : base(repository, logger, unitOfWork, mapper, configMapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _configMapper = configMapper;
            _config = config;
            _repository = repository;
            _logger = logger;
        }


    }
}