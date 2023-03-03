using SICIT.MVC.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SITIC.MVC.Controllers
{
    [ValidarSesion]
    public class AreasController : Controller
    {
        // GET: Areas
        public ActionResult IndexAreas()
        {
            return View();
        }
    }
}