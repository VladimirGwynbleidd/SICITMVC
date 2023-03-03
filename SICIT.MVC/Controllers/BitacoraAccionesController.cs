using SICIT.MVC.Helpers;
using System.Web.Mvc;

namespace SITIC.MVC.Controllers
{
    [ValidarSesion]
    public class BitacoraAccionesController : Controller
    {
        // GET: BitacoraAcciones
        public ActionResult IndexBitacoraAcciones()
        {
            return View();
        }
    }
}