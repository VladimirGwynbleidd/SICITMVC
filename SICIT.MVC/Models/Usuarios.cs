using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SICIT.MVC.Models
{
    public class Usuarios
    {
        public string USUARIO { get; set; }
        public int ID_PERFIL { get; set; }
        public int ID_PUESTO { get; set; }
        public int ID_AREA { get; set; }
        public int ID_T_ENT { get; set; }
        public int CVE_ID_ENT { get; set; }
        public string NOMBRES { get; set; }
        public string APELLIDO_PATERNO { get; set; }
        public string APELLIDO_MATERNO { get; set; }
        public string TELEFONO { get; set; }
        public string EMAIL { get; set; }
        public int PRIMERA_SESION { get; set; }
        public bool VIG_FLAG { get; set; }
        public DateTime FECH_INI_VIG { get; set; }
        public DateTime FECH_FIN_VIG { get; set; }
        public int ENVIO_EMAIL { get; set; }
        public string DESCRIPCION_PERFIL { get; set; }
        public string DESC_T_ENT { get; set; }
        public string SIGLAS_ENT { get; set; }
        public string DESC_AREA { get; set; }
        public string DESCRIPCION_PUESTO { get; set; }
        public string CONTRASENA { get; set; }
    }
}