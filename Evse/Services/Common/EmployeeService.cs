﻿using AutoMapper;
using AutoMapper.QueryableExtensions;
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
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace Evse.Services
{
    public interface IEmployeeService : IServiceBase<Employee, EmployeeDto>
    {
        Task<object> LoadData(DataManager dm, string lang);
        Task<object> LoadData(DataManager dm, string farmGuid, string lang);
        //Task<object> GetEmployees();
        Task<object> GetEmployeesByAccountID(decimal accountID);
        Task<object> GetAudit(object id);
        Task<OperationResult> CheckExist(string no);
    }
    public class EmployeeService : ServiceBase<Employee, EmployeeDto>, IEmployeeService
    {
        private readonly IRepositoryBase<Employee> _repo;
        private readonly IRepositoryBase<CodeType> _repoCodeType;
        private readonly IRepositoryBase<XAccount> _repoXAccount;
        private readonly IRepositoryBase<XAccountGroup> _repoXAccountGroup;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly MapperConfiguration _configMapper;
private readonly IEvseLoggerService _logger;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public EmployeeService(
            IRepositoryBase<Employee> repo,
            IRepositoryBase<CodeType> repoCodeType,
            IRepositoryBase<XAccountGroup> repoXAccountGroup,
            IRepositoryBase<XAccount> repoXAccount,
            IUnitOfWork unitOfWork,
            IMapper mapper,
            MapperConfiguration configMapper,
IEvseLoggerService logger,
            IHttpContextAccessor httpContextAccessor
            )
            : base(repo, logger, unitOfWork, mapper, configMapper)
        {
            _repo = repo;
_logger = logger;
            _repoCodeType = repoCodeType;
            _repoXAccount = repoXAccount;
            _repoXAccountGroup = repoXAccountGroup;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _configMapper = configMapper;
            _httpContextAccessor = httpContextAccessor;
        }
        public override async Task<List<EmployeeDto>> GetAllAsync()
        {
            var query = _repo.FindAll(x => x.Status == 1 && x.Status == 0).ProjectTo<EmployeeDto>(_configMapper);

            var data = await query.ToListAsync();
            return data;

        }
        public override async Task<OperationResult> DeleteAsync(object id)
        {
            var item = _repo.FindByID(id);
            item.Status = 9;
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
        public override async Task<OperationResult> AddAsync(EmployeeDto model)
        {
            try
            {
                // var accessToken = _httpContextAccessor.HttpContext.Request.Headers["Authorization"];
                //decimal accountID = JWTExtensions.GetDecodeTokenByID(accessToken);
                decimal accountID = 0;
                var employee = await _repo.FindAll(x => x.EmployeeNo == model.No && x.Status == 1).AnyAsync();
                if (employee)
                    return new OperationResult
                    {
                        StatusCode = HttpStatusCode.BadRequest,
                        Message = "Already existed NO.!",
                        Success = true,
                        Data = null
                    };

                var nickName = await _repo.FindAll(x => x.EmployeeNickname == model.NickName && x.Status == 1).AnyAsync();
                if (nickName)
                    return new OperationResult
                    {
                        StatusCode = HttpStatusCode.BadRequest,
                        Message = "Already existed NickName!",
                        Success = true,
                        Data = null
                    };
               

                var item = _mapper.Map<Employee>(model);
                // item.Status = 1;
                item.CreateBy = accountID;
                item.Guid = Guid.NewGuid().ToString().ToUpper();
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
        public override async Task<OperationResult> UpdateAsync(EmployeeDto model)
        {
            try
            {
                // var accessToken = _httpContextAccessor.HttpContext.Request.Headers["Authorization"];
                //decimal accountID = JWTExtensions.GetDecodeTokenByID(accessToken);
                // var accountID = 0;
                var item = await _repo.FindByIDAsync(model.Id);

                var employee = await _repo.FindAll(x => x.EmployeeNo == model.No && x.Status == 1).FirstOrDefaultAsync();
                if (employee != null && item.EmployeeNo != model.No)
                    return new OperationResult
                    {
                        StatusCode = HttpStatusCode.BadRequest,
                        Message = "Already existed NO!",
                        Success = true,
                        Data = null
                    };
                var nickName = await _repo.FindAll(x => x.EmployeeNickname == model.NickName && x.Status == 1).FirstOrDefaultAsync();
                if (nickName != null && item.EmployeeNickname != model.NickName)
                    return new OperationResult
                    {
                        StatusCode = HttpStatusCode.BadRequest,
                        Message = "Already existed NickName!",
                        Success = true,
                        Data = null
                    };
                item.EmployeeNo = model.No;
                item.EmployeeName = model.Name;
                item.EmployeeNickname = model.NickName;
                item.EmployeeIdcard = model.Idcard;
                item.EmployeeEmail = model.Email;
                item.EmployeeTel = model.Tel;
                item.EmployeeMobile = model.Mobile;
                item.EmployeeAddress = model.Address;
                item.EmployeeAddressDomicile = model.AddressDomicile;
                item.EmployeeUnit = model.Unit;
                item.EmployeeDept = model.Dept;
                item.EmployeeLevel = model.Level;
                item.EmployeeSex = model.Sex;
                item.Status = model.Status;
                _repo.Update(item);

                await _unitOfWork.SaveChangeAsync();
                var result = _mapper.Map<EmployeeDto>(item);

                operationResult = new OperationResult
                {
                    StatusCode = HttpStatusCode.OK,
                    Message = MessageReponse.UpdateSuccess,
                    Success = true,
                    Data = result
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
            // IQueryable<EmployeeDto> datasource = _repo.FindAll(x => x.Status == 1).ProjectTo<EmployeeDto>(_configMapper);

            var datasource = (from a in _repo.FindAll(x => x.Status == 1 || x.Status == 0)
                              join b in _repoCodeType.FindAll(x => x.CodeType1 == CodeTypeConst.EMPLOYEE_SEX && x.Status == "Y") on a.EmployeeSex equals Convert.ToDecimal(b.CodeNo) into ab
                              from t in ab.DefaultIfEmpty()
                              join d1 in _repoXAccountGroup.FindAll(x => x.Status == 1) on a.EmployeeDept equals d1.Guid into xd
                              from d in xd.DefaultIfEmpty()
                              join u1 in _repoCodeType.FindAll(x => x.Status == "Y" && x.CodeType1 == CodeTypeConst.Account_Unit) on a.EmployeeUnit equals u1.CodeNo into xu
                              from u in xu.DefaultIfEmpty()
                               join st in _repoCodeType.FindAll(x => x.Status == "Y" && x.CodeType1 == CodeTypeConst.Employee_Status) on a.Status equals Convert.ToDecimal(st.CodeNo) into ass
                              from status in ass.DefaultIfEmpty()
                              select new EmployeeDto
                              {
                                  Id = a.Id,
                                  Name = a.EmployeeName,
                                  No = a.EmployeeNo,
                                  NickName = a.EmployeeNickname,
                                  Tel = a.EmployeeTel,
                                  Mobile = a.EmployeeMobile,
                                  Address = a.EmployeeAddress,
                                  AddressDomicile = a.EmployeeAddressDomicile,
                                  Idcard = a.EmployeeIdcard,
                                  Email = a.EmployeeEmail,
                                  Comment = a.Comment,
                                  Unit = a.EmployeeUnit,
                                  Dept = a.EmployeeDept,
                                  Level = a.EmployeeLevel,
                                  ContactName = a.ContactName,
                                  ContactTel = a.ContactTel,
                                  BirthDay = a.EmployeeBirthday,
                                  StartDate = a.StartDate,
                                  EndDate = a.EndDate,
                                  CreateDate = a.CreateDate,
                                  CreateBy = a.CreateBy,
                                  UpdateDate = a.UpdateDate,
                                  UpdateBy = a.UpdateBy,
                                  DeleteBy = a.DeleteBy,
                                  DeleteDate = a.DeleteDate,
                                  Status = a.Status,
                                  Sex = a.EmployeeSex,
                                  Guid = a.Guid,
                                  SexName = t == null ? "" : lang == Languages.EN ? t.CodeNameEn ?? t.CodeName : lang == Languages.VI ? t.CodeNameVn ?? t.CodeName : lang == Languages.CN ? t.CodeNameCn ?? t.CodeName : t.CodeName,
                                  UnitName = u == null ? "" : lang == Languages.EN ? u.CodeNameEn ?? u.CodeName : lang == Languages.VI ? u.CodeNameVn ?? u.CodeName : lang == Languages.CN ? u.CodeNameCn ?? u.CodeName : u.CodeName,
                                  DeptName = d == null ? "" : d.GroupNo + " " + d.GroupName,
                                  StatusName = status == null ? "" : lang == Languages.EN ? status.CodeNameEn ?? status.CodeName : lang == Languages.VI ? status.CodeNameVn ?? status.CodeName : lang == Languages.CN ? status.CodeNameCn ?? status.CodeName : status.CodeName,
                             
                              }).OrderByDescending(x => x.Id).AsQueryable();
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
        public async Task<object> LoadData(DataManager data, string farmGuid, string lang)
        {
            // IQueryable<EmployeeDto> datasource = _repo.FindAll(x => x.Status == 1).ProjectTo<EmployeeDto>(_configMapper);

            var datasource = (from a in _repo.FindAll(x => (x.Status == 1 || x.Status == 0))
                              join b in _repoCodeType.FindAll(x => x.CodeType1 == CodeTypeConst.EMPLOYEE_SEX && x.Status == "Y") on a.EmployeeSex equals Convert.ToDecimal(b.CodeNo) into ab
                              from t in ab.DefaultIfEmpty()
                              join d1 in _repoXAccountGroup.FindAll(x => x.Status == 1) on a.EmployeeDept equals d1.Guid into xd
                              from d in xd.DefaultIfEmpty()
                              join u1 in _repoCodeType.FindAll(x => x.Status == "Y" && x.CodeType1 == CodeTypeConst.Account_Unit) on a.EmployeeUnit equals u1.CodeNo into xu
                              from u in xu.DefaultIfEmpty()
                              join st in _repoCodeType.FindAll(x => x.Status == "Y" && x.CodeType1 == CodeTypeConst.Employee_Status) on a.Status equals Convert.ToDecimal(st.CodeNo) into ass
                              from status in ass.DefaultIfEmpty()
                              select new EmployeeDto
                              {
                                  Id = a.Id,
                                  Name = a.EmployeeName,
                                  No = a.EmployeeNo,
                                  NickName = a.EmployeeNickname,
                                  Tel = a.EmployeeTel,
                                  Mobile = a.EmployeeMobile,
                                  Address = a.EmployeeAddress,
                                  AddressDomicile = a.EmployeeAddressDomicile,
                                  Idcard = a.EmployeeIdcard,
                                  Email = a.EmployeeEmail,
                                  Comment = a.Comment,
                                  Unit = a.EmployeeUnit,
                                  Dept = a.EmployeeDept,
                                  Level = a.EmployeeLevel,
                                  ContactName = a.ContactName,
                                  ContactTel = a.ContactTel,
                                  BirthDay = a.EmployeeBirthday,
                                  StartDate = a.StartDate,
                                  EndDate = a.EndDate,
                                  CreateDate = a.CreateDate,
                                  CreateBy = a.CreateBy,
                                  UpdateDate = a.UpdateDate,
                                  UpdateBy = a.UpdateBy,
                                  DeleteBy = a.DeleteBy,
                                  DeleteDate = a.DeleteDate,
                                  Status = a.Status,
                                  Sex = a.EmployeeSex,
                                  Guid = a.Guid,
                                  SexName = t == null ? "" : lang == Languages.EN ? t.CodeNameEn ?? t.CodeName : lang == Languages.VI ? t.CodeNameVn ?? t.CodeName : lang == Languages.CN ? t.CodeNameCn ?? t.CodeName : t.CodeName,
                                  UnitName = u == null ? "" : lang == Languages.EN ? u.CodeNameEn ?? u.CodeName : lang == Languages.VI ? u.CodeNameVn ?? u.CodeName : lang == Languages.CN ? u.CodeNameCn ?? u.CodeName : u.CodeName,
                                  DeptName = d == null ? "" : d.GroupNo + " " + d.GroupName,
                                  StatusName = status == null ? "" : lang == Languages.EN ? status.CodeNameEn ?? status.CodeName : lang == Languages.VI ? status.CodeNameVn ?? status.CodeName : lang == Languages.CN ? status.CodeNameCn ?? status.CodeName : status.CodeName,
                              }).OrderByDescending(x => x.Id).AsQueryable();
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
        /// <summary>
        /// Not use
        /// </summary>
        /// <returns></returns>
        //public async Task<object> GetEmployees()
        //{
        //    var query = from a in _repo.FindAll(x => x.Status == 1).AsNoTracking()
        //                join b in _repoAccount.FindAll().AsNoTracking() on a.Guid equals b.Employee.Guid into gj
        //                from x in gj.DefaultIfEmpty()
        //                select new
        //                {
        //                    a.Id,
        //                    a.Name,
        //                    a.NickName,
        //                    x.EmployeeId
        //                };

        //    return await query.Where(x => x.EmployeeId == null).ToListAsync();

        //}
        public async Task<object> GetEmployeesByAccountID(decimal accountID)
        {
            var farm = await _repoXAccount.FindByIDAsync(accountID);
            var farmGuid = farm != null ? farm.Guid : "";
            var query = from a in _repo.FindAll(x => x.Status == 1).AsNoTracking()
                        join b in _repoXAccount.FindAll(x => x.Status == "1" && x.FarmGuid == farmGuid).AsNoTracking() on a.Guid equals b.EmployeeGuid into gj
                        from x in gj.DefaultIfEmpty()
                        where x.EmployeeGuid == null || x.EmployeeGuid == ""
                        select new
                        {
                            a.Id,
                            Name =  a.EmployeeName,
                            a.Guid,
                            NickName= a.EmployeeNickname
                        };
            if (accountID > 0)
            {
                var query2 = from a in _repo.FindAll(x => x.Status == 1).AsNoTracking()
                             join b in _repoXAccount.FindAll(x => x.Status == "1").AsNoTracking() on a.Guid equals b.EmployeeGuid
                             where b.AccountId == accountID
                             select new
                             {
                                a.Id,
                                 Name = a.EmployeeName,
                                 a.Guid,
                                 NickName = a.EmployeeNickname
                             };
                var data = await query.ToListAsync();
                var data2 = await query2.ToListAsync();
                return data.Concat(data2).ToList().DistinctBy(x => x.Id);

            }
            return await query.ToListAsync();

            // return await query.Where(x => x.EmployeeID == null || x.AccountID == accountID).ToListAsync();

        }
        public async Task<object> GetAudit(object id)
        {
            var data = await _repo.FindAll(x => x.Id.Equals(id)).AsNoTracking().Select(x => new { x.UpdateBy, x.CreateBy, x.UpdateDate, x.CreateDate }).FirstOrDefaultAsync();
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
                var updateAudit = await _repoXAccount.FindAll(x => x.AccountId == data.UpdateBy).AsNoTracking().Select(x => new { x.Uid }).FirstOrDefaultAsync();
                updateBy = updateBy != null ? updateAudit.Uid : "N/A";
                updateDate = data.UpdateDate.HasValue ? data.UpdateDate.Value.ToString("yyyy/MM/dd HH:mm:ss") : "N/A";
            }
            if (data.CreateBy > 0)
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

        public async Task<OperationResult> CheckExist(string no)
        {
            var value = await _repo.FindAll(x => x.EmployeeNo.Equals(no)).AsNoTracking().FirstOrDefaultAsync();
            if (value != null)
                return new OperationResult
                {
                    StatusCode = HttpStatusCode.OK,
                    Message = MessageReponse.Exist,
                    Success = true,
                    Data = value
                };
            return new OperationResult
            {
                StatusCode = HttpStatusCode.OK,
                Message = MessageReponse.Ok,
                Success = true,
                Data = value
            };
        }
    }
}


