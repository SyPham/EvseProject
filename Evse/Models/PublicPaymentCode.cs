﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace Evse.Models
{
    public partial class PublicPaymentCode
    {
        public int Id { get; set; }
        public string UpperGuid { get; set; }
        public string AccountGuid { get; set; }
        public string PaymentCode { get; set; }
        public int AccountId { get; set; }
        public bool Status { get; set; }
        public DateTime CreateDate { get; set; }
    }
}