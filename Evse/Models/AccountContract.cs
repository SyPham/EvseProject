﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace Evse.Models
{
    public partial class AccountContract
    {
        public decimal Id { get; set; }
        public string AccountGuid { get; set; }
        public string CountyGuid { get; set; }
        public string SiteGuid { get; set; }
        public string DeviceGuid { get; set; }
        public string ContractPath { get; set; }
        public string Comment { get; set; }
        public decimal? Status { get; set; }
        public decimal? CreateBy { get; set; }
        public DateTime? CreateDate { get; set; }
        public decimal? UpdateBy { get; set; }
        public DateTime? UpdateDate { get; set; }
        public string Guid { get; set; }
    }
}