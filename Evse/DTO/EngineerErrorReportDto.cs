﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;

namespace Evse.DTO
{
    public partial class EngineerErrorReportDto
    {
        public decimal Id { get; set; }
        public string ErrorSite { get; set; }
        public string DeviceGuid { get; set; }
        public string ViewError { get; set; }
        public string PhotoPath { get; set; }
        public string Comment { get; set; }
        public DateTime? CreateDate { get; set; }
        public decimal? CreateBy { get; set; }
        public DateTime? UpdateDate { get; set; }
        public decimal? UpdateBy { get; set; }
        public DateTime? DeleteDate { get; set; }
        public decimal? DeleteBy { get; set; }
        public string Status { get; set; }
        public string Guid { get; set; }
        public string StatusName { get; set; }
        public string ErrorSiteName { get; set; }
        public string DeviceGuidName { get; set; }
        public string ViewErrorName { get; set; }
        public IFormFile File { get; set; }
    }
}