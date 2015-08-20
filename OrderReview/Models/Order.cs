using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OrderReview.Models
{
    public class Order
    {
        public int id {get; set;}
        public int orderNumber { get; set; }
        public DateTime orderDate { get; set; }
        public string productName { get; set; }
        public string orderStatus { get; set; }        
        public string customerName { get; set; }
        public string salesPersonName { get; set; }
        public DateTime expectedDeliveryDate { get; set; }
    }

}