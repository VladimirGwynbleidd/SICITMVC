using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SITIC.MVC.Controllers
{
    public class PuestosController : Controller
    {
        // GET: Puestos
        public ActionResult IndexPuestos()
        {
            return View();
        }
    }
}