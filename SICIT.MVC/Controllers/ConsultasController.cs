﻿using SICIT.MVC.Helpers;
using System.Web.Mvc;
//using SICIT.MVC.ServicioSICIT;
using SICIT.MVC.ServicioSICIT;

namespace SICIT.MVC.Controllers
{
    [ValidarSesion]
    public class ConsultasController : Controller
    {
        // GET: Consultas
        public ActionResult IndexConsultas()
        {
            //SICITServicePortClient client = new SICITServicePortClient();
            ServicioSICIT.SICITServicePortClient valor = new SICITServicePortClient(); 
            
            


            return View();
        }

        // GET: Consultas/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: Consultas/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Consultas/Create
        [HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: Consultas/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: Consultas/Edit/5
        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: Consultas/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: Consultas/Delete/5
        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}
