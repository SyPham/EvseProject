using AutoMapper;
using Evse.Data;
using Evse.DTO;
using Evse.Models;
using Evse.Services.Base;

namespace Evse.Services
{
    public interface IAccountPermissionService: IServiceBase<AccountPermission, AccountPermissionDto>
    {
    }
    public class AccountPermissionService : ServiceBase<AccountPermission, AccountPermissionDto>, IAccountPermissionService
    {
        private readonly IRepositoryBase<AccountPermission> _repo;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly MapperConfiguration _configMapper;
private readonly IEvseLoggerService _logger;

        public AccountPermissionService(
            IRepositoryBase<AccountPermission> repo,
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
