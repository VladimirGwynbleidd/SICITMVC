using Newtonsoft.Json;
using SICIT.MVC.Models;
using SICIT.MVC.Tools;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Mvc;


namespace SITIC.MVC.Controllers
{
    public class LoginController : Controller
    {
        public ActionResult IndexLogin()
        {
            return View();
        }

        [HttpPost]
        public async Task<ActionResult> IniciarSesion(string pass, string user)
        {
            var result = string.Empty;
            var acceso = new Usuarios { USUARIO = user };

            try
            {
                string VPath = "http://localhost:6435/api/Usuarios/GetUsuarioById";
                var baseUrl = new Uri(VPath);
                var client = new HttpClient();
                client.BaseAddress = baseUrl;

                var response = await client.PostAsJsonAsync(VPath, acceso);

                if (response.IsSuccessStatusCode)
                {
                    result = await response.Content.ReadAsStringAsync();

                    if (!result.Contains("[]"))
                    {
                        Usuarios deserializedAcceso = JsonConvert.DeserializeObject<List<Usuarios>>(result)[0];

                        if (deserializedAcceso.VIG_FLAG)
                        {
                            var p = HashPassword.CreatePassword(pass);

                            if (deserializedAcceso.CONTRASENA == p)
                            {
                                if (deserializedAcceso.PRIMERA_SESION == 1)
                                {
                                    Session["Usuario"] = deserializedAcceso.USUARIO;
                                    return Json(new { Exito = "true", PrimeraSesion = 1 });
                                }
                                else
                                {
                                    Session["Acceso"] = deserializedAcceso;
                                    return Json(new { Exito = "true", PrimeraSesion = 0 });
                                }
                            }
                            else
                            {
                                return Json(new { Exito = "false", Mensaje = "Usuario o Contraseña incorrectos" });
                            }
                        }
                        else
                        {
                            return Json(new { Exito = "false", Mensaje = "Usuario no activo" });
                        }
                    }
                    else
                    {
                        return Json(new { Exito = "false", Mensaje = "Usuario no valido" });
                    }
                }
                else
                {
                    return Json(new { Exito = "false", Mensaje = "Sistema no disponible en este momento" });
                }
            }
            catch (Exception ex)
            {
                return Json(new { Exito = "false", Mensaje = "Sistema no disponible en este momento" });
            }
        }
    }
}
