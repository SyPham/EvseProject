using AutoMapper;
using AutoMapper.QueryableExtensions;
using Evse.Data;
using Evse.DTO;
using Evse.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Evse.Services
{
    public interface IXAccountPermissionService
    {
 Task<bool> CheckPermissionAsync(string functionCode, string action, string[] roles);
    }

    public class XAccountPermissionService : IXAccountPermissionService
    {
        private readonly EvseDataContext _context;
        private IMapper _mapper;
        private MapperConfiguration _configMapper;
        private OperationResult operationResult;

        public XAccountPermissionService(
            MapperConfiguration configMapper,
            IMapper mapper
,
            EvseDataContext context)
        {
            _context = context;
            _configMapper = configMapper;
            _mapper = mapper;
            _context = context;
        }

        public async Task<bool> CheckPermissionAsync(string functionCode, string action, string[] roles)
        {
            var permissions = await _context.XAccountPermissions.Where(x=> x.CodeNo == functionCode).Select(x=> x.CodeNo).ToListAsync();
            var accountPermissions =await _context.XAccountGroupPermissions.Where(x=> x.CodeNo == functionCode && roles.Contains(x.UpperGuid)).Select(x=> x.CodeNo).ToListAsync();
            var query = permissions.Concat(accountPermissions);
            return await Task.FromResult(query.Any());
        }

        public async Task<List<XAccountPermissionDto>> GetAllAsync()
        {
            return await _context.XAccountPermissions.ProjectTo<XAccountPermissionDto>(_configMapper).ToListAsync();
        }

    }
}