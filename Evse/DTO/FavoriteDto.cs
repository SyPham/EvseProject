﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace Evse.DTO
{
    public partial class FavoriteDto
    {
        public decimal Id { get; set; }
        public string MemberGuid { get; set; }
        public string SiteGuid { get; set; }
        public string Comment { get; set; }
        public DateTime? CreateDate { get; set; }
        public decimal? CreateBy { get; set; }
        public DateTime? UpdateDate { get; set; }
        public decimal? UpdateBy { get; set; }
        public DateTime? DeleteDate { get; set; }
        public decimal? DeleteBy { get; set; }
        public decimal? Status { get; set; }
        public string Guid { get; set; }
    }
    public partial class AddFavoriteDto
    {
        public string MemberGuid { get; set; }
        public string SiteGuid { get; set; }
    }
    public partial class FavoriteListItemDto
    {
        public decimal Id { get; set; }
        public string SiteGuid { get; set; }
        public string SiteName { get; set; }
        public string SiteNo { get; set; }
        public string SiteAddress { get; set; }
    }
}