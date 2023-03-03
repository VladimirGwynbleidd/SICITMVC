using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;

namespace SICIT.MVC.Tools
{
    public class HashPassword
    {
        public static string CreatePassword(string psw)
        {
            return FormsAuthentication.HashPasswordForStoringInConfigFile(psw, "md5");
        }
    }
}