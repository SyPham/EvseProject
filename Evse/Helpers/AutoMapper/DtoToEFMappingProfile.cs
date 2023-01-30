﻿using AutoMapper;
using Evse.DTO;
using Evse.DTO.auth;
using Evse.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Evse.Helpers.AutoMapper
{
    public class DtoToEFMappingProfile : Profile
    {
        public DtoToEFMappingProfile()
        {
         
            CreateMap<EmployeeDto, Employee>();
            CreateMap<EmployeeDto, Employee>();
            CreateMap<SystemLanguageDto, SystemLanguage>();
            CreateMap<XAccountDto, XAccount>();
            CreateMap<XAccountGroupDto, XAccountGroup>();
            CreateMap<SysMenuDto, SysMenu>();
            CreateMap<CodePermissionDto, CodePermission>();
            CreateMap<ChartSettingDto, SysMenu>();
            CreateMap<CodeTypeDto, CodeType>();
            CreateMap<SystemConfigDto, SystemConfig>();
            CreateMap<SiteDto, Site>();
            CreateMap<MemberDto, Member>();
            CreateMap<LandLordDto, LandLord>();
            CreateMap<EngineerDto, Engineer>();

        }
    }
}
