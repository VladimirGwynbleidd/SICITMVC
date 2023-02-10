using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SITIC.MVC.Controllers
{
    public class TipoEntidadController : Controller
    {
        // GET: TipoEntidad
        public ActionResult IndexTipoEntidad()
        {
            return View();
        }

        // GET: TipoEntidad/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: TipoEntidad/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: TipoEntidad/Create
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

        // GET: TipoEntidad/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: TipoEntidad/Edit/5
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

        // GET: TipoEntidad/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: TipoEntidad/Delete/5
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
