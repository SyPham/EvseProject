﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace Evse.Models
{
    public partial class AccountType
    {
        public AccountType()
        {
            Account1s = new HashSet<Account1>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }

        public virtual ICollection<Account1> Account1s { get; set; }
    }
}