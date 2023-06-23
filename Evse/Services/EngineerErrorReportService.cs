using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using Evse.Constants;
using Evse.Data;
using Evse.DTO;
using Evse.Helpers;
using Evse.Models;
using Evse.Services.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Syncfusion.JavaScript;
using Syncfusion.JavaScript.DataSources;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Hosting;
using NetUtility;
using System.IO;

namespace Evse.Services
{
    public interface IEngineerErrorReportService : IServiceBase<EngineerErrorReport, EngineerErrorReportDto>
    {
        Task<object> LoadData(DataManager data, string lang);
        Task<object> GetByGuid(string guid);
        Task<object> GetAudit(object id);
        Task<object> DeleteUploadFile(decimal key);
        Task<OperationResult> AddFormAsync(EngineerErrorReportDto model);
        Task<OperationResult> UpdateFormAsync(EngineerErrorReportDto model);
        Task<object> LoadDataForMobile(DataManager data, string lang);
           Task<OperationResult> SaveFile(IFormFile file, decimal id, string type);
        Task<OperationResult> RemoveFile(decimal id, string type);
    }
    public class EngineerErrorReportService : ServiceBase<EngineerErrorReport, EngineerErrorReportDto>, IEngineerErrorReportService, IScopeService
    {
        private readonly IRepositoryBase<EngineerErrorReport> _repo;
        private readonly IRepositoryBase<CodeType> _repoCodeType;
        private readonly IRepositoryBase<XAccount> _repoXAccount;
        private readonly IRepositoryBase<Device> _repoDevice;
        private readonly IRepositoryBase<Site> _repoSite;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly MapperConfiguration _configMapper;
        private readonly IEvseLoggerService _logger;
        private readonly IWebHostEnvironment _currentEnvironment;
        public EngineerErrorReportService(
            IRepositoryBase<EngineerErrorReport> repo,
            IRepositoryBase<CodeType> repoCodeType,
            IRepositoryBase<XAccount> repoXAccount,
            IUnitOfWork unitOfWork,
            IMapper mapper,
            MapperConfiguration configMapper,
IEvseLoggerService logger
,
IWebHostEnvironment currentEnvironment,
IRepositoryBase<Device> repoDevice,
IRepositoryBase<Site> repoSite)
            : base(repo, logger, unitOfWork, mapper, configMapper)
        {
            _repo = repo;
            _logger = logger;
            _repoCodeType = repoCodeType;
            _repoXAccount = repoXAccount;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _configMapper = configMapper;
            _currentEnvironment = currentEnvironment;
            _repoDevice = repoDevice;
            _repoSite = repoSite;
        }
        public override async Task<object> GetDataDropdownlist(DataManager data)
        {
            var datasource = (from a in _repo.FindAll()
                              select new ElectricianErrorReportDto
                              {

                                  Id = a.Id,
                                  DeviceGuid = a.DeviceGuid,
                                  ErrorSite = a.ErrorSite,
                                  ViewError = a.ViewError,
                                  PhotoPath = a.PhotoPath,

                                  Comment = a.Comment,
                                  CreateDate = a.CreateDate,
                                  CreateBy = a.CreateBy,
                                  UpdateDate = a.UpdateDate,
                                  UpdateBy = a.UpdateBy,
                                  DeleteDate = a.DeleteDate,
                                  DeleteBy = a.DeleteBy,
                                  Status = a.Status,
                                  Guid = a.Guid,

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
            return await datasource.ToListAsync();
        }

        public async Task<object> GetByGuid(string guid)
        {
            return await _repo.FindAll(x => x.Guid == guid)
              .FirstOrDefaultAsync();
        }
        public async Task<object> LoadData(DataManager data, string lang)
        {
            var datasource = (from a in _repo.FindAll()
                              join s in _repoCodeType.FindAll(x => x.CodeType1 == CodeTypeConst.EngineerErrorReport_Status && x.Status == "Y") on a.Status equals s.CodeNo into ab
                              from t in ab.DefaultIfEmpty()
                              join de in _repoDevice.FindAll() on a.DeviceGuid equals de.Guid into ade
                              from dev in ade.DefaultIfEmpty()
                              join si in _repoSite.FindAll() on a.ErrorSite equals si.Guid into asi
                              from sit in asi.DefaultIfEmpty()

                              join v in _repoCodeType.FindAll(x => x.CodeType1 == CodeTypeConst.EngineerErrorReport_Status && x.Status == "Y") on a.Status equals v.CodeNo into av
                              from vi in av.DefaultIfEmpty()

                              select new EngineerErrorReportDto
                              {
                                  Id = a.Id,
                                  DeviceGuid = a.DeviceGuid,
                                  ErrorSite = a.ErrorSite,
                                  ViewError = a.ViewError,
                                  PhotoPath = a.PhotoPath,

                                  Comment = a.Comment,
                                  CreateDate = a.CreateDate,
                                  CreateBy = a.CreateBy,
                                  UpdateDate = a.UpdateDate,
                                  UpdateBy = a.UpdateBy,
                                  DeleteDate = a.DeleteDate,
                                  DeleteBy = a.DeleteBy,
                                  Status = a.Status,
                                  Guid = a.Guid,
                                  StatusName = t == null ? "" : lang == Languages.EN ? t.CodeNameEn ?? t.CodeName : lang == Languages.VI ? t.CodeNameVn ?? t.CodeName : lang == Languages.CN ? t.CodeNameCn ?? t.CodeName : t.CodeName,
                                  ViewErrorName = t == null ? "" : lang == Languages.EN ? vi.CodeNameEn ?? vi.CodeName : lang == Languages.VI ? vi.CodeNameVn ?? vi.CodeName : lang == Languages.CN ? vi.CodeNameCn ?? vi.CodeName : vi.CodeName,
                                  DeviceGuidName = dev == null ? "" : dev.DeviceName,
                                  ErrorSiteName = sit == null ? "" : sit.SiteName,
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
        public async Task<object> LoadDataForMobile(DataManager data, string lang)
        {
            var datasource = (from a in _repo.FindAll()
                              join s in _repoCodeType.FindAll(x => x.CodeType1 == CodeTypeConst.EngineerErrorReport_Status && x.Status == "Y") on a.Status equals s.CodeNo into ab
                              from t in ab.DefaultIfEmpty()
                              join de in _repoDevice.FindAll() on a.DeviceGuid equals de.Guid into ade
                              from dev in ade.DefaultIfEmpty()
                              join si in _repoSite.FindAll() on a.ErrorSite equals si.Guid into asi
                              from sit in asi.DefaultIfEmpty()

                              join v in _repoCodeType.FindAll(x => x.CodeType1 == CodeTypeConst.EngineerErrorReport_Status && x.Status == "Y") on a.Status equals v.CodeNo into av
                              from vi in av.DefaultIfEmpty()

                              select new EngineerErrorReportDto
                              {
                                  Id = a.Id,
                                  DeviceGuid = a.DeviceGuid,
                                  ErrorSite = a.ErrorSite,
                                  ViewError = a.ViewError,
                                  PhotoPath = a.PhotoPath,

                                  Comment = a.Comment,
                                  CreateDate = a.CreateDate,
                                  CreateBy = a.CreateBy,
                                  UpdateDate = a.UpdateDate,
                                  UpdateBy = a.UpdateBy,
                                  DeleteDate = a.DeleteDate,
                                  DeleteBy = a.DeleteBy,
                                  Status = a.Status,
                                  Guid = a.Guid,
                                  StatusName = t == null ? "" : lang == Languages.EN ? t.CodeNameEn ?? t.CodeName : lang == Languages.VI ? t.CodeNameVn ?? t.CodeName : lang == Languages.CN ? t.CodeNameCn ?? t.CodeName : t.CodeName,
                                  ViewErrorName = t == null ? "" : lang == Languages.EN ? vi.CodeNameEn ?? vi.CodeName : lang == Languages.VI ? vi.CodeNameVn ?? vi.CodeName : lang == Languages.CN ? vi.CodeNameCn ?? vi.CodeName : vi.CodeName,
                                  DeviceGuidName = dev == null ? "" : dev.DeviceName,
                                  ErrorSiteName = sit == null ? "" : sit.SiteName,
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
        public override async Task<List<EngineerErrorReportDto>> GetAllAsync()
        {
            var query = _repo.FindAll().ProjectTo<EngineerErrorReportDto>(_configMapper);

            var data = await query.ToListAsync();
            return data;

        }
        public override async Task<OperationResult> AddAsync(EngineerErrorReportDto model)
        {
            var item = _mapper.Map<EngineerErrorReport>(model);
            _repo.Add(item);
            try
            {
                await _unitOfWork.SaveChangeAsync();
                operationResult = new OperationResult
                {
                    StatusCode = HttpStatusCode.OK,
                    Message = MessageReponse.AddSuccess,
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

        public async Task<OperationResult> AddFormAsync(EngineerErrorReportDto model)
        {
       
            FileExtension fileExtension = new FileExtension();
            var avatarUniqueFileName = string.Empty;
            var avatarFolderPath = "FileUploads\\images\\engineerErrorReport\\avatar";
            string uploadAvatarFolder = Path.Combine(_currentEnvironment.WebRootPath, avatarFolderPath);
            if (model.File != null)
            {
                IFormFile files = model.File;
                if (!files.IsNullOrEmpty())
                {
                    avatarUniqueFileName = await fileExtension.WriteAsync(files, $"{uploadAvatarFolder}\\{avatarUniqueFileName}");
                    model.PhotoPath = $"/FileUploads/images/engineerErrorReport/avatar/{avatarUniqueFileName}";
                }
            }
            try
            {
                var item = _mapper.Map<EngineerErrorReport>(model);
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
                await _logger.LogStoreProcedure(new LoggerParams
                {
                    Type = EvseLogConst.Create,
                    LogText = $"Type: {ex.GetType().Name}, Message: {ex.Message}, StackTrace: {ex.ToString()}"
                }).ConfigureAwait(false);
                if (!avatarUniqueFileName.IsNullOrEmpty())
                    fileExtension.Remove($"{uploadAvatarFolder}\\{avatarUniqueFileName}");

                operationResult = ex.GetMessageError();
            }
            return operationResult;
        }

      
        public async Task<OperationResult> UpdateFormAsync(EngineerErrorReportDto model)
        {

            FileExtension fileExtension = new FileExtension();
            var itemModel = await _repo.FindAll(x => x.Id == model.Id).AsNoTracking().FirstOrDefaultAsync();
            var item = _mapper.Map<EngineerErrorReport>(model);


            // Nếu có đổi ảnh thì xóa ảnh cũ và thêm ảnh mới
            var avatarUniqueFileName = string.Empty;
            var avatarFolderPath = "FileUploads\\images\\engineerErrorReport\\avatar";
            string uploadAvatarFolder = Path.Combine(_currentEnvironment.WebRootPath, avatarFolderPath);

            if (model.File != null)
            {
                IFormFile filesAvatar = model.File;
                if (!filesAvatar.IsNullOrEmpty())
                {
                    if (!item.PhotoPath.IsNullOrEmpty())
                        fileExtension.Remove($"{_currentEnvironment.WebRootPath}{item.PhotoPath.Replace("/", "\\").Replace("/", "\\")}");
                    avatarUniqueFileName = await fileExtension.WriteAsync(filesAvatar, $"{uploadAvatarFolder}\\{avatarUniqueFileName}");
                    item.PhotoPath = $"/FileUploads/images/engineerErrorReport/avatar/{avatarUniqueFileName}";
                }
            }

            try
            {

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
                await _logger.LogStoreProcedure(new LoggerParams
                {
                    Type = EvseLogConst.Update,
                    LogText = $"Type: {ex.GetType().Name}, Message: {ex.Message}, StackTrace: {ex.ToString()}"
                }).ConfigureAwait(false);
                // Nếu tạo ra file rồi mã lưu db bị lỗi thì xóa file vừa tạo đi
                if (!avatarUniqueFileName.IsNullOrEmpty())
                    fileExtension.Remove($"{uploadAvatarFolder}\\{avatarUniqueFileName}");

                operationResult = ex.GetMessageError();
            }
            return operationResult;
        }

        public async Task<object> DeleteUploadFile(decimal key)
        {
            try
            {
                var item = await _repo.FindByIDAsync(key);
                if (item != null)
                {
                    string uploadAvatarFolder = Path.Combine(_currentEnvironment.WebRootPath, item.PhotoPath);
                    FileExtension fileExtension = new FileExtension();
                    var avatarUniqueFileName = item.PhotoPath;
                    if (!avatarUniqueFileName.IsNullOrEmpty())
                    {
                        var result = fileExtension.Remove($"{_currentEnvironment.WebRootPath}\\{item.PhotoPath}");
                        if (result)
                        {
                            item.PhotoPath = null;
                            _repo.Update(item);
                            await _unitOfWork.SaveChangeAsync();
                        }
                    }
                }


                return new { status = true };
            }
            catch (Exception ex)
            {
    await _logger.LogStoreProcedure(new LoggerParams {
                    Type= EvseLogConst.Delete,
                    LogText = $"Type: { ex.GetType().Name}, Message: { ex.Message}, StackTrace: {ex.ToString()}"
                }).ConfigureAwait(false);
                return new { status = true };
            }
        }


public async Task<OperationResult> SaveFile(IFormFile file, decimal id, string type)
        {



            try
            {
                var item = await _repo.FindAll().FirstOrDefaultAsync(x => x.Id == id);
                if (item != null)
                {

                    FileExtension fileExtension = new FileExtension();
                    var avatarUniqueFileName = string.Empty;
                    var avatarFolderPath = "FileUploads\\images\\engineerErrorReport\\idcard";
                    string uploadAvatarFolder = Path.Combine(_currentEnvironment.WebRootPath, avatarFolderPath);
                    if (file != null)
                    {
                        IFormFile files = file;
                        if (!files.IsNullOrEmpty())
                        {
                            
                                 avatarUniqueFileName = await fileExtension.WriteAsync(files, $"{uploadAvatarFolder}\\{avatarUniqueFileName}");
                                item.PhotoPath = $"/FileUploads/images/engineerErrorReport/idcard/{avatarUniqueFileName}";
                           
                        }
                    }
                    _repo.Update(item);
                    await _unitOfWork.SaveChangeAsync();

                }
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
                await _logger.LogStoreProcedure(new LoggerParams
                {
                    Type = EvseLogConst.Update,
                    LogText = $"Type: {ex.GetType().Name}, Message: {ex.Message}, StackTrace: {ex.ToString()}"
                }).ConfigureAwait(false);

                operationResult = ex.GetMessageError();
            }
            return operationResult;

        }

        public async Task<OperationResult> RemoveFile(decimal id, string type)
        {
            try
            {
                var item = await _repo.FindByIDAsync(id);
                if (item != null)
                {
                    string path = item.PhotoPath;
                    string uploadAvatarFolder = Path.Combine(_currentEnvironment.WebRootPath, path);
                    FileExtension fileExtension = new FileExtension();
                    if (!path.IsNullOrEmpty())
                    {
                        var result = fileExtension.Remove($"{_currentEnvironment.WebRootPath}\\{path}");
                        if (result)
                        {
                            item.PhotoPath = string.Empty;
                            _repo.Update(item);
                            await _unitOfWork.SaveChangeAsync();
                        }
                    }
                }
                operationResult = new OperationResult
                {
                    StatusCode = HttpStatusCode.OK,
                    Message = MessageReponse.UpdateSuccess,
                    Success = true,
                    Data = item
                };

                return operationResult;
            }
            catch (Exception ex)
            {
                await _logger.LogStoreProcedure(new LoggerParams
                {
                    Type = EvseLogConst.Delete,
                    LogText = $"Type: {ex.GetType().Name}, Message: {ex.Message}, StackTrace: {ex.ToString()}"
                }).ConfigureAwait(false);
                operationResult = ex.GetMessageError();
                return operationResult;

            }
        }

    }
    
}
