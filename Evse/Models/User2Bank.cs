﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace Evse.Models
{
    public partial class User2Bank
    {
        public decimal Id { get; set; }
        public string UserGuid { get; set; }
        public string BankGuid { get; set; }
        public string BankAccount { get; set; }
        public decimal? Status { get; set; }
        public string Comment { get; set; }
        public DateTime? CreateDate { get; set; }
        public string Guid { get; set; }
    }
}