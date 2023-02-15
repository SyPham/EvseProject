using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using NetUtility;
using Evse.Constants;
using Evse.Data;
using Evse.DTO;
using Evse.Helpers;
using Evse.Models;
using Evse.Services.Base;
using Syncfusion.JavaScript;
using Syncfusion.JavaScript.DataSources;
using System;
using System.Collections.Generic;
using NetUtility;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Syncfusion.JavaScript.DataVisualization.Models.Diagram;

namespace Evse.Services
{
    public interface IUser2BankService : IServiceBase<User2Bank, User2BankDto>
    {
        Task<object> GetByGuid(string guid);
        Task<object> LoadData(DataManager dataManager, string lang);

    }
    public class User2BankService : ServiceBase<User2Bank, User2BankDto>, IUser2BankService, IScopeService
    {
        private readonly IRepositoryBase<User2Bank> _repo;
        private readonly IRepositoryBase<XAccount> _repoXAccount;
        private readonly IRepositoryBase<Bank> _repoBank;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ISequenceService _sequenceService;
        private readonly IMapper _mapper;
        private readonly MapperConfiguration _configMapper;
        private readonly IRepositoryBase<LandLord> _repoLandLord;
        private readonly IRepositoryBase<CodeType> _repoCodeType;
        private readonly IEvseLoggerService _logger;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IWebHostEnvironment _currentEnvironment;

        public User2BankService(
            IRepositoryBase<User2Bank> repo,
            IRepositoryBase<XAccount> repoXAccount,
            IUnitOfWork unitOfWork,
            ISequenceService sequenceService,
            IMapper mapper,
            MapperConfiguration configMapper,
            IRepositoryBase<LandLord> repoLandLord,
            IRepositoryBase<CodeType> repoCodeType,
             IRepositoryBase<Bank> repoBank,
IEvseLoggerService logger,
            IHttpContextAccessor httpContextAccessor,
            IWebHostEnvironment currentEnvironment
            )
            : base(repo, logger, unitOfWork, mapper, configMapper)
        {
            _repo = repo;
            _repoXAccount = repoXAccount;
            _logger = logger;
            _repoXAccount = repoXAccount;
            _unitOfWork = unitOfWork;
            _sequenceService = sequenceService;
            _mapper = mapper;
            _configMapper = configMapper;
            _repoLandLord = repoLandLord;
            _repoCodeType = repoCodeType;
            _repoBank = repoBank;
            _httpContextAccessor = httpContextAccessor;
            _currentEnvironment = currentEnvironment;
        }

        public async Task<object> GetByGuid(string guid)
        {
            return await _repo.FindAll(x => x.Guid == guid)
              .FirstOrDefaultAsync();
        }

        public override async Task<List<User2BankDto>> GetAllAsync()
        {
            var query = _repo.FindAll(x => x.Status ==1)
                .ProjectTo<User2BankDto>(_configMapper);

            var data = await query.ToListAsync();
            return data;

        }
        public override async Task<OperationResult> DeleteAsync(object id)
        {
            var item = _repo.FindByID(id);
            item.Status = 1;
            _repo.Update(item);
            try
            {
                await _unitOfWork.SaveChangeAsync();
                operationResult = new OperationResult
                {
                    StatusCode = HttpStatusCode.OK,
                    Message = MessageReponse.DeleteSuccess,
                    Success = true,
                    Data = item
                };
            }
            catch (Exception ex)
            {
                operationResult = ex.GetMessageError();
            }
            return operationResult;
        }

       
      

        public async Task<object> LoadData(DataManager data, string lang)
        {
            var datasource = (from a in _repo.FindAll(x => x.Status == 1)
                              join b in _repoCodeType.FindAll(x => x.CodeType1 == CodeTypeConst.User2Bank && x.Status == "Y") on a.Status equals Convert.ToDecimal(b.CodeNo) into ab
                       from t in ab.DefaultIfEmpty()

                       join d1 in _repoBank.FindAll(x => x.Status == 1) on a.BankGuid equals d1.Guid into xd
                       from d in xd.DefaultIfEmpty()


                       join d2 in _repoLandLord.FindAll(x => x.Status == 1) on a.UserGuid equals d2.Guid into ae
                       from e in ae.DefaultIfEmpty()
                       select new User2BankDto
                       {
                           Id = a.Id,
                           Guid = a.Guid,
                           BankGuid = a.BankGuid,
                           UserGuid = a.UserGuid,
                           UserGuidName = e == null ? "" : e.LandLordNo + " " + e.LandLordName,
                           BankGuidName = d == null ? "" : d.BankNo + " " + d.BankName,
                           BankAccount = a.BankAccount,
                           Status = a.Status,
                           CreateDate = a.CreateDate,
                           Comment = a.Comment,
                           StatusName = t == null ? "" : lang == Languages.EN ? t.CodeNameEn ?? t.CodeName : lang == Languages.VI ? t.CodeNameVn ?? t.CodeName : lang == Languages.CN ? t.CodeNameCn ?? t.CodeName : t.CodeName,
                       }).AsQueryable();

            var count = await datasource.CountAsync();
            if (data.Where != null) // for filtering
                datasource = QueryableDataOperations.PerformWhereFilter(datasource, data.Where, data.Where[0].Condition);
            if (data.Sorted != null)//for sorting
                datasource = QueryableDataOperations.PerformSorting(datasource, data.Sorted);
            if (data.Search != null)
                datasource = QueryableDataOperations.PerformSearching(datasource, data.Search);
            count = await datasource.CountAsync();
            if (data.Skip >= 0)//for paging
                datasource = QueryableDataOperations.PerformSkip(datasource, data.Skip);
            if (data.Take > 0)//for paging
                datasource = QueryableDataOperations.PerformTake(datasource, data.Take);
            return new
            {
                Result = await datasource.ToListAsync(),
                Count = count
            };
        }
       
    }
}
