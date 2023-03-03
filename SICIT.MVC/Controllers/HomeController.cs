using SICIT.MVC.Helpers;
using System.Web.Mvc;

namespace SITIC.MVC.Controllers
{
    [ValidarSesion]
    public class HomeController : Controller
    {
        public ActionResult CerrarSesion()
        {
            Session["Acceso"] = null;
            return RedirectToAction("IndexLogin", "Login");
        }

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}