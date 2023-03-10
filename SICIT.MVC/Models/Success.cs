﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SICIT.MVC.Models
{
    [Serializable]
    public class Success<T>
    {
        public Success()
        {
        }
        public bool Exito { get; set; }
        public string Mensaje { get; set; }
        public int Valor { get; set; }
        public T Data { get; set; }
        public List<T> ResponseData { get; set; }
        public IEnumerable<T> ResponseDataEnumerable { get; set; }
    }
}