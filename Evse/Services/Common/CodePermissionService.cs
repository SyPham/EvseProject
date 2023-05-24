﻿using AutoMapper;
using AutoMapper.QueryableExtensions;
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
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace Evse.Services
{
    public interface ICodePermissionService: IServiceBase<CodePermission, CodePermissionDto>
    {
        Task<object> LoadData(DataManager data);
        Task<object> GetAudit(object id);
        Task<object> GetPermissionsByRoleId(string role, string lang);
    }
    public class CodePermissionService : ServiceBase<CodePermission, CodePermissionDto>, ICodePermissionService
    {
        private readonly IRepositoryBase<XAccountGroup> _repoXAccountGroup;
        private readonly IRepositoryBase<CodePermission> _repo;
        private readonly IRepositoryBase<XAccount> _repoXAccount;
        private readonly IRepositoryBase<XAccountGroupPermission> _repoXAccountGroupPermission;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly MapperConfiguration _configMapper;
private readonly IEvseLoggerService _logger;
        public CodePermissionService(
            IRepositoryBase<CodePermission> repo,
            IRepositoryBase<XAccount> repoXAccount,
            IUnitOfWork unitOfWork,
            IMapper mapper,
            MapperConfiguration configMapper,
IEvseLoggerService logger
,
IRepositoryBase<XAccountGroupPermission> repoXAccountGroupPermission,
IRepositoryBase<XAccountGroup> repoXAccountGroup)
            : base(repo, logger, unitOfWork, mapper, configMapper)
        {
            _repo = repo;
            _logger = logger;
            _repoXAccount = repoXAccount;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _configMapper = configMapper;
            _repoXAccountGroupPermission = repoXAccountGroupPermission;
            _repoXAccountGroup = repoXAccountGroup;
        }
        public override async Task<OperationResult> AddAsync(CodePermissionDto model)
        {
            try
            {
                var item = _mapper.Map<CodePermission>(model);
                item.Status = "1";
                _repo.Add(item);
                await _unitOfWork.SaveChangeAsync();

                operationResult = new OperationResult
                {
                    StatusCode = HttpStatusCode.OK,
                    Message = MessageReponse.AddSuccess,
                    Success = true,
                    Data = model
                };
            }
            catch (Exception ex)
            {
                operationResult = ex.GetMessageError();
            }
            return operationResult;
        }
        public override async Task<OperationResult> UpdateAsync(CodePermissionDto model)
        {
            var item = _mapper.Map<CodePermission>(model);
            item.Status = "1";
            _repo.Update(item);
            try
            {
                await _unitOfWork.SaveChangeAsync();
                operationResult = new OperationResult
                {
                    StatusCode = HttpStatusCode.OK,
                    Message = MessageReponse.UpdateSuccess,
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
        public override async Task<OperationResult> DeleteAsync(object id)
        {
            var item = await _repo.FindByIDAsync(id);
            item.Status = "0";
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
        public async Task<object> LoadData(DataManager data)
        {
            var datasource = _repo.FindAll(x => x.Status == "1")
                .OrderByDescending(x => x.Id)
                .ProjectTo<CodePermissionDto>(_configMapper);
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
        public async Task<object> GetAudit(object id)
        {
            var data = await _repo.FindAll(x => x.Id.Equals(id)).AsNoTracking().Select(x=> new {x.UpdateBy, x.CreateBy, x.UpdateDate, x.CreateDate }).FirstOrDefaultAsync();
            string createBy = "N/A";
            string createDate = "N/A";
            string updateBy = "N/A";
            string updateDate = "N/A";
            if (data == null)
                return new
                {
                    createBy,
                    createDate,
                    updateBy,
                    updateDate
                };
            if (data.UpdateBy.HasValue)
            {
                var updateAudit = await _repoXAccount.FindAll(x => x.AccountId == data.UpdateBy).AsNoTracking().Select(x=> new { x.Uid }).FirstOrDefaultAsync();
                updateBy = updateBy != null ? updateAudit.Uid : "N/A";
                updateDate = data.UpdateDate.HasValue ? data.UpdateDate.Value.ToString("yyyy/MM/dd HH:mm:ss") : "N/A";
            }
            if (data.CreateBy.HasValue)
            {
                var createAudit = await _repoXAccount.FindAll(x => x.AccountId == data.CreateBy).AsNoTracking().Select(x => new { x.Uid }).FirstOrDefaultAsync();
                createBy = createAudit != null ? createAudit.Uid : "N/A";
                createDate = data.CreateDate.HasValue ? data.CreateDate.Value.ToString("yyyy/MM/dd HH:mm:ss") : "N/A";
            }
            return new
            {
                createBy,
                createDate,
                updateBy,
                updateDate
            };
        }

        public async Task<object> GetPermissionsByRoleId(string roleTemp, string lang)
        {
            var role = roleTemp.ToSafetyString();
            var xaccountGroup = await _repoXAccountGroup.FindAll().Where(x=> EF.Functions.Collate(x.GroupNo, "SQL_Latin1_General_CP1_CS_AS") == role).FirstOrDefaultAsync();
           var roleGuid = "";
           if (xaccountGroup != null) {
            roleGuid = xaccountGroup.Guid;
           }
            var query = from a in _repo.FindAll(x=> x.Status == "1")
                  
                    select new {
                        Name = lang == Languages.EN ? (a.CodeNameEn == "" || a.CodeNameEn == null ? a.CodeName : a.CodeNameEn) : lang == Languages.VI ? (a.CodeNameVn == "" || a.CodeNameVn == null ? a.CodeName : a.CodeNameVn) : lang == Languages.TW ? a.CodeName : lang == Languages.CN ? (a.CodeNameCn == "" || a.CodeNameCn == null ? a.CodeName : a.CodeNameCn) : a.CodeName,
                        Checked =(from r in _repoXAccountGroupPermission.FindAll()  where roleGuid == r.UpperGuid && r.CodeNo == a.CodeNo select r.Id).Any()

                    };
            return await query.ToListAsync();
        }
    }
}
