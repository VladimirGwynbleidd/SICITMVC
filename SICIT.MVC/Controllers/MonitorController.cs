using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace SICIT.MVC.Controllers
{
    public class MonitorController : Controller
    {
     
        public ActionResult IndexMonitor()
        {
            return View();
        }


        [HttpGet]
        public ActionResult GetReport(string numFolio)
        {
            var procesarFileGPG = new MemoryStream();
            return File(procesarFileGPG.ToArray(), System.Net.Mime.MediaTypeNames.Application.Octet, "Report.pdf");
        }
    }
}
