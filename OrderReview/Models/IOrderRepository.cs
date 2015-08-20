using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OrderReview.Models
{
    public interface IOrderRepository
    {
        Order Create();

        Order Save(Order Order);
        
        Order Save(int id, Order Order);

        Order GetOrder(int orderId);

        List<Order> GetOrder();
        
    }
}