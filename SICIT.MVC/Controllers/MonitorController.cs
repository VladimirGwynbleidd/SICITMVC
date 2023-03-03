using SICIT.MVC.Helpers;
using System.IO;
using System.Web.Mvc;

namespace SICIT.MVC.Controllers
{
    [ValidarSesion]
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
