using SICIT.MVC.Helpers;
using System.Web.Mvc;

namespace SITIC.MVC.Controllers
{
    [ValidarSesion]
    public class BitacoraSesionesController : Controller
    {
        // GET: BitacoraSesiones
        public ActionResult IndexBitacoraSesiones()
        {
            return View();
        }
    }
}