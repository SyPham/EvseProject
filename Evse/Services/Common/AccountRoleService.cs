using AutoMapper;
using Evse.Data;
using Evse.DTO;
using Evse.Models;
using Evse.Services.Base;

namespace Evse.Services
{
    public interface IAccountRoleService: IServiceBase<AccountRole, AccountRoleDto>
    {
    }
    public class AccountRoleService : ServiceBase<AccountRole, AccountRoleDto>, IAccountRoleService
    {
        private readonly IRepositoryBase<AccountRole> _repo;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly MapperConfiguration _configMapper;
private readonly IEvseLoggerService _logger;

        public AccountRoleService(
            IRepositoryBase<AccountRole> repo,
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
