using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using OrderReview.Models;

namespace OrderReview.Controllers
{
    public class OrdersController : ApiController
    {
        private IOrderRepository _orderRep;

        public OrdersController()
        {
            _orderRep= new OrderRepository();
        }
        public OrdersController(IOrderRepository repository)
        {
            _orderRep = repository;
        }
        // GET api/orders
        public IEnumerable<Order> Get()
        {
            return _orderRep.GetOrder();
        }

        // GET api/orders/5
        public Order Get(int id)
        {            
            return _orderRep.GetOrder(id);
        }

        // POST api/orders
        public Order Post([FromBody]Order order)
        {            
            return _orderRep.Save(order);
        }

        // PUT api/orders/5
        public void Put(int id, [FromBody]Order order)
        {            
            _orderRep.Save(id, order);
        }

        // DELETE api/orders/5
        public void Delete(int id)
        {
        }
    }
}
