using System.Web;
using System.Web.Mvc;

namespace SICIT.MVC.Helpers
{
    public class ValidarSesionAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {

            if (HttpContext.Current.Session["Acceso"] == null)
            {
                filterContext.Result = new RedirectResult("~/Login/IndexLogin");
            }

            base.OnActionExecuting(filterContext);
        }
    }
}