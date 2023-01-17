using AutoMapper;
using Evse.Data;
using Evse.DTO;
using Evse.Models;
using Evse.Services.Base;

namespace Evse.Services
{
    public interface IAccountTypeService: IServiceBase<AccountType, AccountTypeDto>
    {
    }
    public class AccountTypeService : ServiceBase<AccountType, AccountTypeDto>, IAccountTypeService
    {
        private readonly IRepositoryBase<AccountType> _repo;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly MapperConfiguration _configMapper;
private readonly IEvseLoggerService _logger;

        public AccountTypeService(
            IRepositoryBase<AccountType> repo,
            IUnitOfWork unitOfWork,
            IMapper mapper,
            MapperConfiguration configMapper,
IEvseLoggerService logger
            )
            : base(repo, logger, unitOfWork, mapper, configMapper)
        {
            _repo = repo;
_logger = logger;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _configMapper = configMapper;
        }
    }
}
