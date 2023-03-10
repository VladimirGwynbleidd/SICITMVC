using SICIT.MVC.Helpers;
using SICIT.MVC.Models;
using SICIT.MVC.UTILERIAS;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Net.Http;
using System.Web.Mvc;

namespace SICIT.MVC.Controllers
{
    [ValidarSesion]
    public class MonitorController : Controller
    {



        public ActionResult IndexMonitor()
        {
            try
            {
                if ((HttpContext.Session["Acceso"] as Acceso).VIG_FLAG)
                {
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
                EventLog.WriteEntry("Error al ejecutar el método IndexMonitor - : " + ex.InnerException.Message, System.Diagnostics.EventLogEntryType.Error);
                return View();
            }
        }

        private Success<Archivo> DescargarArchivo(Archivo archivo)
        {
            Success<Archivo> success = new Success<Archivo>();
            List<Archivo> list = new List<Archivo>();

            try
            {
                archivo.T_DSC_ARCHIVO = string.Format("Folio{0}_Consulta{1}.pdf", archivo.NUM_FOLIO, archivo.ID_PAQUETE);
                string physicalPath = Server.MapPath("/Documentos/" + archivo.T_DSC_ARCHIVO);

                if (System.IO.File.Exists(physicalPath))
                {
                    byte[] pdfBytes = System.IO.File.ReadAllBytes(physicalPath);
                    archivo.G_DOC_ARCHIVO_BASE64 = Convert.ToBase64String((byte[])pdfBytes);

                    if (archivo.G_DOC_ARCHIVO_BASE64.Length > 0)
                    {
                        list.Add(archivo);
                        success.ResponseDataEnumerable = list;
                        success.Exito = true;
                    }
                    else
                    {
                        success.Exito = false;
                        success.Mensaje = "El archivo no se puede leer";
                    }
                }
                else
                {
                    success.Exito = false;
                    success.Mensaje = "Archivo no encontrado en el directorio";
                }
            }
            catch (Exception ex)
            {
                EventLog.WriteEntry("Error al ejecutar el método IndexMonitor - ObtenerArchivoConcluido: " + ex.InnerException.Message, System.Diagnostics.EventLogEntryType.Error);
                success.Exito = false;
                success.Mensaje = "Hubo un error al extraer el archivo.";
            }

            return success;
        }


        [HttpPost]
        public ActionResult ObtenerArchivoConcluido(Archivo archivo)
        {
            Success<Archivo> success = DescargarArchivo(archivo);
            Accion accion = new Accion();

            if (success.Exito)
            {
                try
                {
                    string servicio = ConfigurationManager.AppSettings["ServiceUrl"];
                    string VPath = "Api/Accion/AgregarAccion";
                    var baseUrl = new Uri(servicio);

                    var client = new HttpClient();
                    client.BaseAddress = baseUrl;

                    accion.USUARIOSESION = ((Acceso)Session["Acceso"]).USUARIOSESION;
                    accion.GUID = ((Acceso)Session["Acceso"]).GUID;
                    accion.ACCION = string.Format("SE CONSULTÓ EL PDF Folio {0}.pdf", archivo.NUM_FOLIO);
                    accion.ID_ACTIVIDAD = 1001;

                    var response = client.PostAsJsonAsync(VPath, accion);
                }
                catch (Exception ex)
                {
                    EventLog.WriteEntry("Error al ejecutar el método IndexNormatividad - UploadFiles: " + ex.Message, System.Diagnostics.EventLogEntryType.Error);
                }
            }

            return Json(success);
        }



        //[HttpGet]
        //public ActionResult GetReport(string numFolio)
        //{
        //    var procesarFileGPG = new MemoryStream();
        //    return File(procesarFileGPG.ToArray(), System.Net.Mime.MediaTypeNames.Application.Octet, "Report.pdf");
        //}
    }
}
