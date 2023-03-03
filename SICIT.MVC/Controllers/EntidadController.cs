using SICIT.MVC.Helpers;
using SICIT.MVC.Models;
using SICIT.MVC.UTILERIAS;
using System;
using System.Web.Mvc;

namespace SITIC.MVC.Controllers
{
    [ValidarSesion]
    public class EntidadController : Controller
    {
        // GET: Entidad
        [HttpGet]
        public ActionResult IndexEntidad()
        {
            try
            {
                if ((HttpContext.Session["Acceso"] as Acceso).VIG_FLAG)
                {
                    ViewData["FQDN"] = ((Acceso)Session["Acceso"]).FQDN;
                    ViewData["USUARIOSESION"] = ((Acceso)Session["Acceso"]).USUARIOSESION;
                    ViewData["GUID"] = ((Acceso)Session["Acceso"]).GUID;

                    return View();
                }
                else
                {
                    return RedirectToAction("Index", "Home");
                }
            }
            catch (Exception ex)
            {
                EventLog.WriteEntry("Error al ejecutar el método IndexEntidad - : " + ex.InnerException.Message, System.Diagnostics.EventLogEntryType.Error);
                return View();
            }
        }
    }
}