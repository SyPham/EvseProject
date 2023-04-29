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
    public interface ITopicService : IServiceBase<Topic,TopicDto>
    {
       
    }

    public class TopicService : ServiceBase<Topic, TopicDto>, ITopicService
    {
        private readonly IRepositoryBase<Topic> _repository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly MapperConfiguration _configMapper;
        private readonly IConfiguration _config;
        private readonly IEvseLoggerService  _logger;

        private OperationResult operationResult;
        public TopicService(IUnitOfWork unitOfWork, IMapper mapper, MapperConfiguration configMapper, IConfiguration config, IRepositoryBase<Topic> repository, IEvseLoggerService logger)
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