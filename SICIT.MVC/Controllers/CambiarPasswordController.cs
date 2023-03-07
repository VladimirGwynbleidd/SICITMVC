using Newtonsoft.Json;
using SICIT.MVC.Helpers;
using SICIT.MVC.Models;
using SICIT.MVC.Tools;
using System;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Mvc;
using SICIT.MVC.UTILERIAS;
using System.Collections.Generic;

namespace SICIT.MVC.Controllers
{

    public class CambiarPasswordController : Controller
    {
        public ActionResult CambiarPasswordIndex()
        {
            try
            {
                return View();

            }
            catch (Exception ex)
            {
                EventLog.WriteEntry("Error al ejecutar el método CambiarPasswordIndex - : " + ex.InnerException.Message, System.Diagnostics.EventLogEntryType.Error);
                return View();
            }
        }

        [HttpPost]
        public async Task<ActionResult> CambiarPassword(string pass)
        {
            if (!string.IsNullOrEmpty(pass))
            {
                var result = string.Empty;
                var newPass = HashPassword.CreatePassword(pass);
                var usuario = Session["Usuario"] as Acceso;
                var acceso = new Usuarios { USUARIO = usuario.USUARIOSESION.ToString(), CONTRASENA = newPass, PRIMERA_SESION = 0 };

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