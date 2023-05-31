using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Evse.Constants
{
    public static class AuditLogConst
    {
        public class TableName
        {
            public static string XAccount = "XAccount";
            public static string Member = "Member";
        }
        public class ActionType
        {
            public static int Delete = 0;
            public static int Add = 1;
            public static int Edit = 2;
        }


    }
}
