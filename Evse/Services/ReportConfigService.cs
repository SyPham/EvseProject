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
    public interface IReportConfigService : IServiceBase<ReportConfig, ReportConfigDto>
    {
        Task<object> LoadLanguages();
        Task<object> GetLanguages(string lang);
        Task<object> LoadLanguages(string lang);
        Task<object> LoadData(DataManager dm);
        Task<object> LoadData(DataManager dm, string page, string type);
        Task<object> LoadReportColumnData(DataManager dm, string systemMenuGuid);
        Task<object> GetReportColumns(string menuLink, string lang);
        Task<object> GetPages(string lang);
        Task<object> GetTypes(string lang);

        Task<OperationResult> UpdateBySequence(string systemMenuGuid, decimal fromSequence, decimal dropSequence);

    }
    public class ReportConfigService : ServiceBase<ReportConfig, ReportConfigDto>, IReportConfigService
    {
        private readonly IRepositoryBase<ReportConfig> _repo;
        private readonly IRepositoryBase<SysMenu> _repoSysMenu;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly MapperConfiguration _configMapper;
private readonly IEvseLoggerService _logger;
        public ReportConfigService(
            IRepositoryBase<ReportConfig> repo,
            IRepositoryBase<SysMenu> repoSysMenu,
            IUnitOfWork unitOfWork,
            IMapper mapper,
            MapperConfiguration configMapper,
IEvseLoggerService logger
            )
            : base(repo, logger, unitOfWork, mapper, configMapper)
        {
            _repo = repo;
_logger = logger;
            _repoSysMenu = repoSysMenu;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _configMapper = configMapper;
        }

        public async Task<OperationResult> UpdateBySequence(string systemMenuGuid, decimal fromSequence, decimal dropSequence)
        {
            try
            {

                if (dropSequence == fromSequence)
                {
                    return new OperationResult
                    {
                        StatusCode = HttpStatusCode.OK,
                        Message = MessageReponse.UpdateSuccess,
                        Success = true,
                    };
                }
                var from = await _repo.FindAll(x => x.Sequence == fromSequence && x.SystemMenuGuid == systemMenuGuid).FirstOrDefaultAsync();
                from.Sequence = dropSequence;
                var drop = await _repo.FindAll(x => x.Sequence == dropSequence && x.SystemMenuGuid == systemMenuGuid).FirstOrDefaultAsync();
                drop.Sequence = fromSequence;

                _repo.Update(from);
                _repo.Update(drop);
                await _unitOfWork.SaveChangeAsync();

                operationResult = new OperationResult
                {
                    StatusCode = HttpStatusCode.OK,
                    Message = MessageReponse.UpdateSuccess,
                    Success = true,
                    Data = drop
                };
            }
            catch (Exception ex)
            {
                operationResult = ex.GetMessageError();
            }
            return operationResult;
        }

        /// <summary>
        /// Add account sau do add AccountGroupAccount
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public override async Task<OperationResult> UpdateAsync(ReportConfigDto model)
        {
            try
            {


                var item = await _repo.FindByIDAsync(model.Id);
                if (item.Slkey != model.Slkey && item.Sltype != SystemReport.ReportColumn)
                {
                    var checkKey = await IsExistKey(model.Slkey);
                    if (checkKey) return new OperationResult
                    {
                        StatusCode = HttpStatusCode.BadRequest,
                        Message = "The key already exist!",
                        Success = false
                    };
                }
                item.Comment = model.Comment;
                item.Slpage = model.Slpage;
                item.Slkey = model.Slkey;
                item.Sltype = model.Sltype;
                item.Sltw = model.Sltw;
                item.Slcn = model.Slcn;
                item.Slen = model.Slen;
                item.Slvn = model.Slvn;
                item.ColumnWidth = model.ColumnWidth;
                item.Sequence = model.Sequence;
                item.SystemMenuGuid = model.SystemMenuGuid;
                item.TextAlign = model.TextAlign;
                _repo.Update(item);
                await _unitOfWork.SaveChangeAsync();

                operationResult = new OperationResult
                {
                    StatusCode = HttpStatusCode.OK,
                    Message = MessageReponse.UpdateSuccess,
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
        public override async Task<OperationResult> AddAsync(ReportConfigDto model)
        {
            try
            {
                var checkKey = await IsExistKey(model.Slkey);
                if (checkKey && model.Sltype != SystemReport.ReportColumn) return new OperationResult
                {
                    StatusCode = HttpStatusCode.BadRequest,
                    Message = "The key already exist!",
                    Success = false
                };
                var item = _mapper.Map<ReportConfig>(model);
                if (model.Sltype == SystemReport.ReportColumn)
                {
                    var sequence = await _repo.FindAll(x => x.SystemMenuGuid == model.SystemMenuGuid).AsNoTracking().Select(x=> x.Sequence).MaxAsync();
                    item.Sequence = sequence.HasValue && sequence.Value > 0  ? ++sequence : 1;
                }
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
        public override async Task<List<ReportConfigDto>> GetAllAsync()
        {
            var query = _repo.FindAll().ProjectTo<ReportConfigDto>(_configMapper);

            var data = await query.OrderBy(x => x.Id).ToListAsync();
            return data;

        }
        public override async Task<OperationResult> DeleteAsync(object id)
        {
            var item = _repo.FindByID(id);
            if (item.Sequence > 0)
            {
                var removeSequence = item.Sequence; // 4
                var query = await _repo.FindAll(x => x.SystemMenuGuid == item.SystemMenuGuid).ToListAsync();

                query.ForEach(
                 x =>
                 {
                     if (x.Sequence > removeSequence)
                     {
                         x.Sequence = x.Sequence - 1;
                     }
                 });
                _repo.UpdateRange(query);

            }
            _repo.Remove(item);
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
        public async Task<object> GetTypes(string lang)
        {
            var query = await _repo.FindAll(x => x.Sltype != null && x.Sltype != "" && x.Sltype != SystemReport.ReportColumn).AsNoTracking().Select(x =>
                x.Sltype
            ).Distinct().ToListAsync();
            return query;
        }
        public async Task<object> GetPages(string lang)
        {
            var query = await _repo.FindAll(x => x.Slpage != null && x.Slpage != "" && x.Sltype != SystemReport.ReportColumn).AsNoTracking().Select(x =>
                x.Slpage
            ).Distinct().ToListAsync();
            return query;
        }

        public async Task<object> LoadLanguages()
        {
            var query = await _repo.FindAll(x => x.Sltype != SystemReport.ReportColumn).AsNoTracking().Select(x => new
            {
                x.Slkey,
                x.Sltype,
                x.Sltw,
                x.Slen,
                x.Slvn,
                x.Slcn,
            }).ToListAsync();

            var tw = query.ToDictionary(t => t.Slkey, t => t.Sltw);
            var en = query.ToDictionary(t => t.Slkey, t => t.Slen);
            var vi = query.ToDictionary(t => t.Slkey, t => t.Slvn);
            var cn = query.ToDictionary(t => t.Slkey, t => t.Slcn);
            var grids = query.Where(x => x.Sltype == "GRID").ToList();
            var pagers = query.Where(x => x.Sltype == "PAGER").ToList();
            var gridtw = grids.ToDictionary(t => t.Slkey, t => t.Sltw);
            var griden = grids.ToDictionary(t => t.Slkey, t => t.Slen);
            var gridcn = grids.ToDictionary(t => t.Slkey, t => t.Slcn);
            var gridvi = grids.ToDictionary(t => t.Slkey, t => t.Slvn);
            var pagertw = pagers.ToDictionary(t => t.Slkey, t => t.Sltw);
            var pageren = pagers.ToDictionary(t => t.Slkey, t => t.Slen);
            var pagercn = pagers.ToDictionary(t => t.Slkey, t => t.Slcn);
            var pagervi = pagers.ToDictionary(t => t.Slkey, t => t.Slvn);

            return new
            {
                tw,
                en,
                vi,
                cn,
                gridtw,
                griden,
                gridcn,
                gridvi,
                pagertw,
                pageren,
                pagercn,
                pagervi,
            };

        }
        public async Task<object> LoadLanguages(string lang)
        {
            string GRID = "GRID";
            string PAGER = "PAGER";
            if (Languages.CN == lang)
            {
                var data = (await _repo.FindAll(x => x.Sltype != SystemReport.ReportColumn).AsNoTracking().Select(x => new
                {
                    x.Slkey,
                    x.Sltype,
                    Name = x.Slcn,
                }).Select(t => new { t.Slkey, t.Name, t.Sltype })
                    .ToListAsync()).DistinctBy(x => x.Slkey);
                var languages = data.Where(x => x.Sltype != GRID && x.Sltype != PAGER).ToDictionary(t => t.Slkey, t => t.Name);
                return languages;

            }
            else if (Languages.TW == lang)
            {
                var data = (await _repo.FindAll(x => x.Sltype != SystemReport.ReportColumn).AsNoTracking().Select(x => new
                {
                    x.Slkey,
                    x.Sltype,
                    Name = x.Sltw,
                }).Select(t => new { t.Slkey, t.Name, t.Sltype })
                    .ToListAsync()).DistinctBy(x => x.Slkey);
                var languages = data.ToDictionary(t => t.Slkey, t => t.Name);
                return languages;
            }
            else if (Languages.EN == lang)
            {
                var data = (await _repo.FindAll(x => x.Sltype != SystemReport.ReportColumn).AsNoTracking().Select(x => new
                {
                    x.Slkey,
                    x.Sltype,
                    Name = x.Slen,
                }).Select(t => new { t.Slkey, t.Name, t.Sltype })
                    .ToListAsync()).DistinctBy(x => x.Slkey);
                var languages = data.ToDictionary(t => t.Slkey, t => t.Name);
                return languages;
            }
            else if (Languages.VI == lang)
            {
                var data = (await _repo.FindAll(x => x.Sltype != SystemReport.ReportColumn).AsNoTracking().Select(x => new
                {
                    x.Slkey,
                    x.Sltype,
                    Name = x.Slvn,
                }).Select(t => new { t.Slkey, t.Name, t.Sltype })
                     .ToListAsync()).DistinctBy(x => x.Slkey);
                var languages = data.ToDictionary(t => t.Slkey, t => t.Name);
                return languages;
            }

            return new List<decimal> { };


        }
        public async Task<object> GetLanguages(string lang)
        {
            string GRID = "GRID";
            string PAGER = "PAGER";
            if (Languages.CN == lang)
            {
                var data = (await _repo.FindAll(x => x.Sltype != SystemReport.ReportColumn).AsNoTracking().Select(x => new
                {
                    x.Slkey,
                    x.Sltype,
                    Name = x.Slcn,
                }).Select(t => new { t.Slkey, t.Name, t.Sltype })
                    .ToListAsync()).DistinctBy(x => x.Slkey);
                var languages = data.Where(x => x.Sltype != GRID && x.Sltype != PAGER).ToDictionary(t => t.Slkey, t => t.Name);
                var grid = data.Where(x => x.Sltype == GRID).ToDictionary(t => t.Slkey, t => t.Name);
                var pager = data.Where(x => x.Sltype == PAGER).ToDictionary(t => t.Slkey, t => t.Name);
                return new
                {
                    languages,
                    grid,
                    pager
                };

            }
            else if (Languages.TW == lang)
            {
                var data = (await _repo.FindAll(x => x.Sltype != SystemReport.ReportColumn).AsNoTracking().Select(x => new
                {
                    x.Slkey,
                    x.Sltype,
                    Name = x.Sltw,
                }).Select(t => new { t.Slkey, t.Name, t.Sltype })
                    .ToListAsync()).DistinctBy(x => x.Slkey);
                var languages = data.ToDictionary(t => t.Slkey, t => t.Name);
                var grid = data.Where(x => x.Sltype == GRID).ToDictionary(t => t.Slkey, t => t.Name);
                var pager = data.Where(x => x.Sltype == PAGER).ToDictionary(t => t.Slkey, t => t.Name);
                return new
                {
                    languages,
                    grid,
                    pager
                };
            }
            else if (Languages.EN == lang)
            {
                var data = (await _repo.FindAll(x => x.Sltype != SystemReport.ReportColumn).AsNoTracking().Select(x => new
                {
                    x.Slkey,
                    x.Sltype,
                    Name = x.Slen,
                }).Select(t => new { t.Slkey, t.Name, t.Sltype })
                    .ToListAsync()).DistinctBy(x => x.Slkey);
                var languages = data.ToDictionary(t => t.Slkey, t => t.Name);
                var grid = data.Where(x => x.Sltype == GRID).ToDictionary(t => t.Slkey, t => t.Name);
                var pager = data.Where(x => x.Sltype == PAGER).ToDictionary(t => t.Slkey, t => t.Name);
                return new
                {
                    languages,
                    grid,
                    pager
                };
            }
            else if (Languages.VI == lang)
            {
                var data = (await _repo.FindAll(x => x.Sltype != SystemReport.ReportColumn).AsNoTracking().Select(x => new
                {
                    x.Slkey,
                    x.Sltype,
                    Name = x.Slvn,
                }).Select(t => new { t.Slkey, t.Name, t.Sltype })
                     .ToListAsync()).DistinctBy(x => x.Slkey);
                var languages = data.ToDictionary(t => t.Slkey, t => t.Name);
                var grid = data.Where(x => x.Sltype == GRID).ToDictionary(t => t.Slkey, t => t.Name);
                var pager = data.Where(x => x.Sltype == PAGER).ToDictionary(t => t.Slkey, t => t.Name);
                return new
                {
                    languages,
                    grid,
                    pager
                };
            }

            return new
            {
                languages = new List<decimal> { },
                grid = new List<decimal> { },
                pager = new List<decimal> { },
            };

        }
        public async Task<object> LoadData(DataManager data)
        {
            IQueryable<ReportConfigDto> datasource = _repo.FindAll(x => x.Sltype != SystemReport.ReportColumn)
                .OrderByDescending(x => x.Id).ProjectTo<ReportConfigDto>(_configMapper);
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
        public async Task<object> LoadData(DataManager data, string page, string type)
        {
            IQueryable<ReportConfigDto> datasource =
            _repo.FindAll(x => x.Sltype != SystemReport.ReportColumn)
                 .OrderByDescending(x => x.Id)
                 .ProjectTo<ReportConfigDto>(_configMapper);
            if (!string.IsNullOrEmpty(page) && page != "All")
            {
                datasource = _repo.FindAll(x => x.Sltype != SystemReport.ReportColumn)
                .OrderByDescending(x => x.Id)
                .ProjectTo<ReportConfigDto>(_configMapper)
                .Where(x => x.Slpage == page)
                .AsQueryable();
            }
            if (!string.IsNullOrEmpty(type) && type != "All")
            {
                datasource = _repo.FindAll(x => x.Sltype != SystemReport.ReportColumn)
              .OrderByDescending(x => x.Id)
              .ProjectTo<ReportConfigDto>(_configMapper)
              .Where(x => x.Sltype == type)
              .AsQueryable();
            }
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

        public async Task<bool> IsExistKey(string key)
        {
            return await _repo.FindAll().AsNoTracking().AnyAsync(x => EF.Functions.Collate(x.Slkey, "SQL_Latin1_General_CP1_CS_AS") == key);

        }

        public async Task<object> LoadReportColumnData(DataManager data, string systemMenuGuid)
        {
            IQueryable<ReportConfigDto> datasource = _repo.FindAll(x => x.SystemMenuGuid == systemMenuGuid)
               .OrderBy(x => x.Sequence)
               .ProjectTo<ReportConfigDto>(_configMapper);
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

        public async Task<object> GetReportColumns(string menuLink, string lang)
        {
            var menu = await _repoSysMenu.FindAll(x => x.Status == 1 && x.MenuLink == menuLink).Select(x => x.Guid).FirstOrDefaultAsync();
            if (menu == null) return new List<dynamic> { };

            string systemMenuGuid = menu == null ? "" : menu;
            var datasource = await _repo.FindAll(x => x.SystemMenuGuid == systemMenuGuid)
                .OrderBy(x => x.Sequence)
                .Select(x => new
                {
                    field = x.Slkey,
                    width = x.ColumnWidth,
                    textAlign = x.TextAlign,
                    allowSorting = true,
                    headerText = lang == Languages.EN ? x.Slen ?? x.Sltw : lang == Languages.VI ? x.Slvn ?? x.Sltw : lang == Languages.CN ? x.Slcn ?? x.Sltw : x.Sltw
                }
                ).ToListAsync();
            return datasource;
        }
    }
}
