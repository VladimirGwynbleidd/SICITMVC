using Newtonsoft.Json;
using SICIT.MVC.Models;
using SICIT.MVC.Tools;
using SICIT.MVC.UTILERIAS;
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

                                string servicio = ConfigurationManager.AppSettings["ServiceUrl"];
                                Acceso accesoPagina = new Acceso();

                                accesoPagina.GUID = Guid.NewGuid().ToString().Substring(0, 24);
                                accesoPagina.USUARIOSESION = deserializedAcceso.USUARIO; //"mojeda";
                                accesoPagina.VIG_FLAG = deserializedAcceso.VIG_FLAG; //true;
                                accesoPagina.FQDN = servicio;
                                accesoPagina.IP = GetIpAddress();
                                accesoPagina.NOMBRE_COMPLETO = string.Format("{0} {1} {2}", deserializedAcceso.NOMBRES, deserializedAcceso.APELLIDO_PATERNO, deserializedAcceso.APELLIDO_MATERNO);

                                if (deserializedAcceso.PRIMERA_SESION == 1)
                                {

                                    //Session["Usuario"] = deserializedAcceso.USUARIO;
                                    Session["Usuario"] = accesoPagina;
                                    return Json(new { Exito = "true", PrimeraSesion = 1 });
                                }
                                else
                                {
                                    BitacoraSesiones bita = new BitacoraSesiones();

                                    bita.ID_SESION = accesoPagina.GUID;
                                    bita.USUARIO = accesoPagina.USUARIOSESION;
                                    bita.DIRECCION_IP = accesoPagina.IP;

                                    //Session["Acceso"] = deserializedAcceso;
                                    Session["Acceso"] = accesoPagina;
                                    var bitaSesion = BitacoraSesion(bita);

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


        [HttpPost]
        public async Task<ActionResult> ObtenerParametros()
        {
            var result = string.Empty;

            try
            {
                string servicio = ConfigurationManager.AppSettings["ServiceUrl"];
                string VPath = "Api/Parametros/ObtenerParametros";
                var baseUrl = new Uri(servicio);

                var client = new HttpClient();
                client.BaseAddress = baseUrl;

                var response = await client.GetAsync(VPath);

                if (response.IsSuccessStatusCode)
                {
                    result = await response.Content.ReadAsStringAsync();
                }

            }
            catch (Exception ex)
            {
                EventLog.WriteEntry("Error al ejecutar el método Login - ObtenerParametros: " + ex.InnerException.Message, System.Diagnostics.EventLogEntryType.Error);
            }

            return Json(result);
        }


        public async Task<ActionResult> BitacoraSesion(BitacoraSesiones bita)
        {
            var result = string.Empty;

            try
            {
                string servicio = ConfigurationManager.AppSettings["ServiceUrl"];
                string VPath = "Api/BitacoraSesiones/AgregarBitacora";
                var baseUrl = new Uri(servicio);

                var client = new HttpClient();
                client.BaseAddress = baseUrl;

                var response = await client.PostAsJsonAsync(VPath, bita);

                if (response.IsSuccessStatusCode)
                {
                    result = await response.Content.ReadAsStringAsync();
                }

            }
            catch (Exception ex)
            {
                EventLog.WriteEntry("Error al ejecutar el método Login - BitacoraSesion: " + ex.InnerException.Message, System.Diagnostics.EventLogEntryType.Error);
            }

            return Json(result);
        }


        public static string GetIpAddress()
        {
            string localIP = string.Empty;

            try
            {
                localIP = System.Web.HttpContext.Current.Request.ServerVariables["HTTP_X_FORWARDED_FOR"];

                if (!string.IsNullOrEmpty(localIP))
                {
                    string[] forwardedIps = localIP.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
                    localIP = forwardedIps[forwardedIps.Length - 1];
                }

                if (string.IsNullOrEmpty(localIP))
                    localIP = System.Web.HttpContext.Current.Request.ServerVariables["REMOTE_ADDR"];

                if (string.IsNullOrEmpty(localIP))
                    localIP = "Sin IP Asignada";
            }
            catch (Exception ex)
            {
                EventLog.WriteEntry("Error al ejecutar el método IndexAcceso - GetIpAddress: " + ex.InnerException.Message, System.Diagnostics.EventLogEntryType.Error);
            }
            return localIP;
        }

    }
}
