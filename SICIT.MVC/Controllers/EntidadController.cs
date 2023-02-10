using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SITIC.MVC.Controllers
{
    public class EntidadController : Controller
    {
        // GET: Entidad
        [HttpGet]
        public ActionResult IndexEntidad()
        {
            return View();
        }
    }
}