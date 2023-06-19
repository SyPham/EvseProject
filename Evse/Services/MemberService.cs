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
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace Evse.Services
{
    public interface IMemberService : IServiceBase<Member, MemberDto>
    {
        Task<object> LoadData(DataManager data, string lang);
        Task<object> GetByGuid(string guid);
        Task<object> GetAudit(object id);
        Task<object> DeleteUploadFile(decimal key);
        Task<OperationResult> AddFormAsync(MemberDto model);
        Task<OperationResult> UpdateFormAsync(MemberDto model);
        Task<OperationResult> UpdatePofileAsync(MemberProfileDto model);
        Task<OperationResult> UpdateFileAsync(MemberUploadFileDto model);
        Task<MemberDto> GetByIdAndLangAsync(decimal id, string lang);
        Task<LastLocationDto> GetLastLocation(string guid);
        Task<OperationResult> StoreLastLocation(LastLocationDto model);
        Task<OperationResult> SaveFile(IFormFile file, decimal id, string type);
        Task<OperationResult> RemoveFile(decimal id, string type);

    }
    public class MemberService : ServiceBase<Member, MemberDto>, IMemberService, IScopeService
    {
        private readonly IRepositoryBase<Member> _repo;
        private readonly IRepositoryBase<CodeType> _repoCodeType;
        private readonly IRepositoryBase<XAccount> _repoXAccount;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly MapperConfiguration _configMapper;
        private readonly IEvseLoggerService _logger;
        private readonly IWebHostEnvironment _currentEnvironment;
        private readonly IAuditLogService _auditLogService;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public MemberService(
            IRepositoryBase<Member> repo,
            IRepositoryBase<CodeType> repoCodeType,
            IRepositoryBase<XAccount> repoXAccount,
            IUnitOfWork unitOfWork,
            IMapper mapper,
            MapperConfiguration configMapper,
IEvseLoggerService logger
,
IWebHostEnvironment currentEnvironment,
IAuditLogService auditLogService,
IHttpContextAccessor httpContextAccessor)
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
            _auditLogService = auditLogService;
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task<object> GetByGuid(string guid)
        {
            return await _repo.FindAll(x => x.Guid == guid)
              .FirstOrDefaultAsync();
        }
        public async Task<MemberDto> GetByIdAndLangAsync(decimal id, string lang)
        {
            return await Datasource(lang).Where(x => x.Id == id)
              .FirstOrDefaultAsync();
        }
        private IQueryable<MemberDto> Datasource(string lang)
        {
            var datasource = (from a in _repo.FindAll(x => x.Status == StatusConstants.Default)
                              join b in _repoCodeType.FindAll(x => x.CodeType1 == CodeTypeConst.Member_SEX && x.Status == "Y") on a.MemberSex equals b.CodeNo into ab
                              from t in ab.DefaultIfEmpty()
                              join c in _repoCodeType.FindAll(x => x.CodeType1 == CodeTypeConst.Member_Status && x.Status == "Y") on a.MemberStatus equals c.CodeNo into ac
                              from status in ac.DefaultIfEmpty()
                              select new MemberDto
                              {
                                  Id = a.Id,
                                  SiteGuid = a.SiteGuid,
                                  Uid = a.Uid,
                                  Upwd = a.Upwd,
                                  MemberNo = a.MemberNo,
                                  MemberName = a.MemberName,
                                  MemberSex = a.MemberSex,
                                  MemberBirthday = a.MemberBirthday,
                                  MemberIdcard = a.MemberIdcard,
                                  MemberEmail = a.MemberEmail,
                                  MemberMobile = a.MemberMobile,

                                  MemberAddress = a.MemberAddress,

                                  MemberLine = a.MemberLine,
                                  CarGuid = a.CarGuid,
                                  CarName = a.CarName,
                                  CarNumber = a.CarNumber,
                                  CarVIN = a.CarVIN,
                                  PaymentGuid = a.PaymentGuid,


                                  PhotoPath = a.PhotoPath,
                                  StartDate = a.StartDate,
                                  EndDate = a.EndDate,
                                  Lastlogin = a.Lastlogin,
                                  LastLocation = a.LastLocation,
                                  Lastuse = a.Lastuse,


                                  Comment = a.Comment,
                                  CreateDate = a.CreateDate,
                                  CreateBy = a.CreateBy,
                                  UpdateDate = a.UpdateDate,
                                  UpdateBy = a.UpdateBy,
                                  DeleteDate = a.DeleteDate,
                                  DeleteBy = a.DeleteBy,
                                  Status = a.Status,
                                  Guid = a.Guid,
                                  MemberStatus = a.MemberStatus,
                                  RoleType = a.RoleType,
                                  CarLicenseCheck = a.CarLicenseCheck,
                                  IdCard1Path = a.IdCard1Path,
                                  IdCard2Path = a.IdCard2Path,
                                  CarLicensePath = a.CarLicensePath,
                                  CarLicense2Path = a.CarLicense2Path,
                                  MemberSexName = t == null ? "" : lang == Languages.EN ? t.CodeNameEn ?? t.CodeName : lang == Languages.VI ? t.CodeNameVn ?? t.CodeName : lang == Languages.CN ? t.CodeNameCn ?? t.CodeName : t.CodeName,
                                  StatusName = status == null ? "" : lang == Languages.EN ? status.CodeNameEn ?? status.CodeName : lang == Languages.VI ? status.CodeNameVn ?? status.CodeName : lang == Languages.CN ? status.CodeNameCn ?? status.CodeName : status.CodeName,
                              }).OrderByDescending(x => x.Id).AsQueryable();
            return datasource;
        }
        public async Task<object> LoadData(DataManager data, string lang)
        {

            var datasource = Datasource(lang);
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

        public override async Task<List<MemberDto>> GetAllAsync()
        {
            var query = _repo.FindAll(x => x.Status == 1).ProjectTo<MemberDto>(_configMapper);

            var data = await query.ToListAsync();
            return data;

        }
        public override async Task<OperationResult> AddAsync(MemberDto model)
        {
            var item = _mapper.Map<Member>(model);
            item.Status = StatusConstants.Default;
            _repo.Add(item);
            try
            {
                await _unitOfWork.SaveChangeAsync();
                string token = _httpContextAccessor.HttpContext.Request.Headers["Authorization"];
                var accountId = JWTExtensions.GetDecodeTokenByID(token).ToDecimal();
                await _auditLogService.AddAsync(new AuditLogDto
                {
                    AccountId = accountId,
                    RecordId = item.Id,
                    ActionType = AuditLogConst.ActionType.Add,
                    TableName = AuditLogConst.TableName.Member,
                    CreateDate = DateTime.Now,
                });
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
            item.Status = StatusConstants.Delete;
            _repo.Update(item);
            try
            {
                await _unitOfWork.SaveChangeAsync();
                string token = _httpContextAccessor.HttpContext.Request.Headers["Authorization"];
                var accountId = JWTExtensions.GetDecodeTokenByID(token).ToDecimal();
                await _auditLogService.AddAsync(new AuditLogDto
                {
                    AccountId = accountId,
                    RecordId = item.Id,
                    ActionType = AuditLogConst.ActionType.Delete,
                    TableName = AuditLogConst.TableName.Member,
                    CreateDate = DateTime.Now,
                });
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

        public async Task<OperationResult> AddFormAsync(MemberDto model)
        {
            var check = await CheckExistName(model.MemberName);
            if (!check.Success) return check;
            var checkMemberNo = await CheckExistNo(model.MemberNo);
            if (!checkMemberNo.Success) return checkMemberNo;
            FileExtension fileExtension = new FileExtension();
            var avatarUniqueFileName = string.Empty;
            var avatarFolderPath = "FileUploads\\images\\member\\avatar";
            string uploadAvatarFolder = Path.Combine(_currentEnvironment.WebRootPath, avatarFolderPath);
            if (model.File != null)
            {
                IFormFile files = model.File.FirstOrDefault();
                if (!files.IsNullOrEmpty())
                {
                    avatarUniqueFileName = await fileExtension.WriteAsync(files, $"{uploadAvatarFolder}\\{avatarUniqueFileName}");
                    model.PhotoPath = $"/FileUploads/images/member/avatar/{avatarUniqueFileName}";
                }
            }
            try
            {
                var item = _mapper.Map<Member>(model);
                item.Upwd = model.Upwd.ToSha512();
                item.Status = StatusConstants.Default;
                _repo.Add(item);
                await _unitOfWork.SaveChangeAsync();
                string token = _httpContextAccessor.HttpContext.Request.Headers["Authorization"];
                var accountId = JWTExtensions.GetDecodeTokenByID(token).ToDecimal();
                await _auditLogService.AddAsync(new AuditLogDto
                {
                    AccountId = accountId,
                    RecordId = item.Id,
                    ActionType = AuditLogConst.ActionType.Add,
                    TableName = AuditLogConst.TableName.Member,
                    CreateDate = DateTime.Now,
                });
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

        public async Task<OperationResult> CheckExistName(string memberName)
        {
            var item = await _repo.FindAll(x => x.MemberName == memberName).AnyAsync();
            if (item)
            {
                return new OperationResult { StatusCode = HttpStatusCode.OK, Message = "The member name already existed!", Success = false };
            }
            operationResult = new OperationResult
            {
                StatusCode = HttpStatusCode.OK,
                Success = true,
                Data = item
            };
            return operationResult;
        }

        public async Task<OperationResult> CheckExistNo(string memberNo)
        {
            var item = await _repo.FindAll(x => x.MemberNo == memberNo).AnyAsync();
            if (item)
            {
                return new OperationResult { StatusCode = HttpStatusCode.OK, Message = "The member NO already existed!", Success = false };
            }
            operationResult = new OperationResult
            {
                StatusCode = HttpStatusCode.OK,
                Success = true,
                Data = item
            };
            return operationResult;
        }
        public async Task<OperationResult> UpdateFormAsync(MemberDto model)
        {

            FileExtension fileExtension = new FileExtension();
            var itemModel = await _repo.FindAll(x => x.Id == model.Id).AsNoTracking().FirstOrDefaultAsync();
            if (itemModel.MemberName != model.MemberName)
            {
                var check = await CheckExistName(model.MemberName);
                if (!check.Success) return check;
            }

            if (itemModel.MemberNo != model.MemberNo)
            {
                var checkMemberNo = await CheckExistNo(model.MemberNo);
                if (!checkMemberNo.Success) return checkMemberNo;
            }
            if (itemModel.Upwd != model.Upwd)
            {
                itemModel.Upwd = model.Upwd.ToSha512();
            }
            var item = _mapper.Map<Member>(model);


            // Nếu có đổi ảnh thì xóa ảnh cũ và thêm ảnh mới
            var avatarUniqueFileName = string.Empty;
            var avatarFolderPath = "FileUploads\\images\\member\\avatar";
            string uploadAvatarFolder = Path.Combine(_currentEnvironment.WebRootPath, avatarFolderPath);

            if (model.File != null)
            {
                IFormFile filesAvatar = model.File.FirstOrDefault();
                if (!filesAvatar.IsNullOrEmpty())
                {
                    if (!item.PhotoPath.IsNullOrEmpty())
                        fileExtension.Remove($"{_currentEnvironment.WebRootPath}{item.PhotoPath.Replace("/", "\\").Replace("/", "\\")}");
                    avatarUniqueFileName = await fileExtension.WriteAsync(filesAvatar, $"{uploadAvatarFolder}\\{avatarUniqueFileName}");
                    item.PhotoPath = $"/FileUploads/images/member/avatar/{avatarUniqueFileName}";
                }
            }

            try
            {

                _repo.Update(item);
                await _unitOfWork.SaveChangeAsync();
                string token = _httpContextAccessor.HttpContext.Request.Headers["Authorization"];
                var accountId = JWTExtensions.GetDecodeTokenByID(token).ToDecimal();
                await _auditLogService.AddAsync(new AuditLogDto
                {
                    AccountId = accountId,
                    RecordId = item.Id,
                    ActionType = AuditLogConst.ActionType.Edit,
                    TableName = AuditLogConst.TableName.Member,
                    CreateDate = DateTime.Now,
                });
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

        public async Task<OperationResult> UpdateFileAsync(MemberUploadFileDto model)
        {

            FileExtension fileExtension = new FileExtension();
            var itemModel = await _repo.FindAll(x => x.Id == model.Id).AsNoTracking().FirstOrDefaultAsync();
            var item = _mapper.Map<Member>(model);


            // Nếu có đổi ảnh thì xóa ảnh cũ và thêm ảnh mới
            var avatarUniqueFileName = string.Empty;
            var avatarFolderPath = "FileUploads\\images\\member\\avatar";
            string uploadAvatarFolder = Path.Combine(_currentEnvironment.WebRootPath, avatarFolderPath);

            if (model.File != null)
            {
                IFormFile filesAvatar = model.File;
                if (!filesAvatar.IsNullOrEmpty())
                {
                    if (!item.PhotoPath.IsNullOrEmpty())
                        fileExtension.Remove($"{_currentEnvironment.WebRootPath}{item.PhotoPath.Replace("/", "\\").Replace("/", "\\")}");
                    avatarUniqueFileName = await fileExtension.WriteAsync(filesAvatar, $"{uploadAvatarFolder}\\{avatarUniqueFileName}");
                    item.PhotoPath = $"/FileUploads/images/member/avatar/{avatarUniqueFileName}";
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
                            item.PhotoPath = string.Empty;
                            _repo.Update(item);
                            await _unitOfWork.SaveChangeAsync();
                        }
                    }
                }


                return new { status = true };
            }
            catch (Exception ex)
            {
                await _logger.LogStoreProcedure(new LoggerParams
                {
                    Type = EvseLogConst.Delete,
                    LogText = $"Type: {ex.GetType().Name}, Message: {ex.Message}, StackTrace: {ex.ToString()}"
                }).ConfigureAwait(false);
                return new { status = true };
            }
        }

        public async Task<OperationResult> UpdatePofileAsync(MemberProfileDto model)
        {
            try
            {
                var item = await _repo.FindByIDAsync(model.Id);
                if (item != null)
                {
                    item.MemberAddress = model.MemberAddress;
                    item.MemberEmail = model.MemberEmail;
                    item.MemberIdcard = model.MemberIdcard;
                    item.MemberMobile = model.MemberMobile;
                    item.MemberName = model.MemberName;
                    item.MemberBirthday = model.MemberBirthday;
                    item.MemberSex = model.MemberSex;
                    item.CarName = model.CarName;
                    item.CarNumber = model.CarNumber;
                    item.CarVIN = model.CarVIN;
                    item.CarGuid = model.CarGuid;
                    _repo.Update(item);
                    await _unitOfWork.SaveChangeAsync();
                    string token = _httpContextAccessor.HttpContext.Request.Headers["Authorization"];
                    var accountId = JWTExtensions.GetDecodeTokenByID(token).ToDecimal();
                    await _auditLogService.AddAsync(new AuditLogDto
                    {
                        AccountId = accountId,
                        RecordId = item.Id,
                        ActionType = AuditLogConst.ActionType.Edit,
                        TableName = AuditLogConst.TableName.Member,
                        CreateDate = DateTime.Now,
                    });
                }
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

                operationResult = ex.GetMessageError();
            }
            return operationResult;

        }

        public async Task<LastLocationDto> GetLastLocation(string guid)
        {
            var item = await _repo.FindAll().FirstOrDefaultAsync(x => x.Guid == guid);
            if (item != null)
                return new LastLocationDto
                {
                    Guid = guid,
                    LastLocation = item.LastLocation
                };
            else
            {
                return null;
            }
        }

        public async Task<OperationResult> StoreLastLocation(LastLocationDto model)
        {
            try
            {
                var item = await _repo.FindAll().FirstOrDefaultAsync(x => x.Guid == model.Guid);
                if (item != null)
                {

                    item.LastLocation = model.LastLocation;
                    _repo.Update(item);
                    await _unitOfWork.SaveChangeAsync();

                }
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

                operationResult = ex.GetMessageError();
            }
            return operationResult;
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
                    var carLicenseFileName = string.Empty;
                    var avatarFolderPath = "FileUploads\\images\\member\\idcard";
                    var carLicenseFolderPath = "FileUploads\\images\\member\\carLicense";
                    string uploadAvatarFolder = Path.Combine(_currentEnvironment.WebRootPath, avatarFolderPath);
                    string carLicenseFolder = Path.Combine(_currentEnvironment.WebRootPath, carLicenseFolderPath);
                    if (file != null)
                    {
                        IFormFile files = file;
                        if (!files.IsNullOrEmpty())
                        {
                            if (type == "1")
                            {
                                 avatarUniqueFileName = await fileExtension.WriteAsync(files, $"{uploadAvatarFolder}\\{avatarUniqueFileName}");
                                item.IdCard1Path = $"/FileUploads/images/member/idcard/{avatarUniqueFileName}";
                            }
                            else  if (type == "2")
                            {
                                 avatarUniqueFileName = await fileExtension.WriteAsync(files, $"{uploadAvatarFolder}\\{avatarUniqueFileName}");
                                item.IdCard2Path = $"/FileUploads/images/member/idcard/{avatarUniqueFileName}";

                            }
                             else  if (type == "3")
                            {
                            carLicenseFileName = await fileExtension.WriteAsync(files, $"{carLicenseFolder}\\{carLicenseFileName}");
                                
                                item.CarLicensePath = $"/FileUploads/images/member/carLicense/{carLicenseFileName}";

                            }
                              else  if (type == "4")
                            {
                            carLicenseFileName = await fileExtension.WriteAsync(files, $"{carLicenseFolder}\\{carLicenseFileName}");

                                item.CarLicense2Path = $"/FileUploads/images/member/carLicense/{carLicenseFileName}";

                            }
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
                    string path = type == "1" ? item.IdCard1Path : item.IdCard2Path;
                    string uploadAvatarFolder = Path.Combine(_currentEnvironment.WebRootPath, path);
                    FileExtension fileExtension = new FileExtension();
                    if (!path.IsNullOrEmpty())
                    {
                        var result = fileExtension.Remove($"{_currentEnvironment.WebRootPath}\\{path}");
                        if (result)
                        {
                             if (type == "1")
                            {
                                item.IdCard1Path = string.Empty;
                            }
                            else if (type == "2")
                            {
                                item.IdCard2Path = string.Empty;

                            }
                              else if (type == "3")
                            {
                                item.CarLicensePath = string.Empty;

                            }
                               else if (type == "4")
                            {
                                item.CarLicense2Path = string.Empty;

                            }
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
