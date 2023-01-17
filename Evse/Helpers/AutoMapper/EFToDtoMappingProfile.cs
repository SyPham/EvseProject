using AutoMapper;
using Evse.DTO;
using Evse.DTO.auth;
using Evse.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Evse.Helpers.AutoMapper
{
    public class EFToDtoMappingProfile : Profile
    {
        public EFToDtoMappingProfile()
        {
            var list = new List<int> { };
            CreateMap<Account, AccountDto>();
            CreateMap<AccountType, AccountTypeDto>();
            CreateMap<XAccount, UserForDetailDto>()
                .ForMember(d => d.Username, o => o.MapFrom(x => x.Uid))
                .ForMember(d => d.ID, o => o.MapFrom(x => x.AccountId));

        
            CreateMap<AccountRole, AccountRoleDto>();
            CreateMap<AccountPermission, AccountPermissionDto>();
            CreateMap<AccountGroup, AccountGroupDto>();
            CreateMap<Employee, EmployeeDto>();

        
            CreateMap<Employee, EmployeeDto>();
        
            CreateMap<SystemLanguage, SystemLanguageDto>();
            CreateMap<XAccount, XAccountDto>();
            CreateMap<XAccountGroup, XAccountGroupDto>();
            CreateMap<SysMenu, SysMenuDto>();



            CreateMap<CodePermission, CodePermissionDto>();


     
            CreateMap<StoredProcedure, StoredProcedureDto>();
            CreateMap<SysMenu, ChartSettingDto>();
            CreateMap<CodeType, CodeTypeDto>();
            CreateMap<Dashboard, DashboardDto>();
        

            CreateMap<SystemConfig, SystemConfigDto>();
          
       
        }

    }
}
