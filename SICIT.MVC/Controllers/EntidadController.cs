﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SICIT.MVC.Helpers;

namespace SITIC.MVC.Controllers
{
    [ValidarSesion]
    public class EntidadController : Controller
    {
        // GET: Entidad
        [HttpGet]
        public ActionResult IndexEntidad()
        {
            return View();
        }
    }
}