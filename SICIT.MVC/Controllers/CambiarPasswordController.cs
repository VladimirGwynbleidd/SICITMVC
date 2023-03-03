using Newtonsoft.Json;
using SICIT.MVC.Models;
using SICIT.MVC.Tools;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;


namespace SICIT.MVC.Controllers
{
    public class CambiarPasswordController : Controller
    {
        public ActionResult CambiarPasswordIndex()
        {
            return View();
        }

        [HttpPost]
        public async Task<ActionResult> CambiarPassword(string pass)
        {
            if (!string.IsNullOrEmpty(pass))
            {
                var result = string.Empty;
                var newPass = HashPassword.CreatePassword(pass);
                var usuario = Session["Usuario"].ToString();
                var acceso = new Usuarios { USUARIO = usuario, CONTRASENA = newPass, PRIMERA_SESION = 0 };

                try
                {
                    string VPath = "http://localhost:6435/api/Usuarios/ResetPassword";
                    var baseUrl = new Uri(VPath);
                    var client = new HttpClient();
                    client.BaseAddress = baseUrl;

                    var response = await client.PostAsJsonAsync(VPath, acceso);

                    if (response.IsSuccessStatusCode)
                    {
                        result = await response.Content.ReadAsStringAsync();

                        if (!result.Contains("[]"))
                        {
                            Success<Usuarios> deserializedAcceso = JsonConvert.DeserializeObject<Success<Usuarios>>(result);

                            if (deserializedAcceso.Exito)
                            {
                                return Json(new { Exito = "true" });
                            }
                            else
                            {
                                return Json(new { Exito = "false", Mensaje = "Error al procesar el cambio de contraseña" });
                            }
                        }
                        else
                        {
                            return Json(new { Exito = "false", Mensaje = "Error al procesar el cambio de contraseña" });
                        }

                    }
                    else
                    {
                        return Json(new { Exito = "false", Mensaje = "Error al procesar el cambio de contraseña" });
                    }
                }
                catch (Exception ex)
                {
                    return Json(new { Exito = "false", Mensaje = "Sistema no disponible en este momento" });
                }
            }
            return View();
        }

    }
}