﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Evse.DTO.auth
{
    public class UserForLoginDto
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
    }
    public class UserForLoginRememberDto
    {
        public decimal ID { get; set; }
    }
}
