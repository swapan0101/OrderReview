using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Hosting;
using Newtonsoft.Json;


namespace OrderReview.Models
{
    public class OrderRepository : IOrderRepository
    {
        /// <summary>
        /// Creates a new Order with default values
        /// </summary>
        /// <returns></returns>
        public Order Create()
        {
            Order Order = new Order
            {
                orderDate = DateTime.Now
            };
            return Order;
        }

        
        /// <summary>
        /// Saves a new Order.
        /// </summary>
        /// <param name="Order"></param>
        /// <returns></returns>
        public Order Save(Order Order)
        {
            // Read in the existing Orders
            var Orders = this.Retrieve();

            // Assign a new Id
            var maxId = Orders.Max(p => p.id);
            Order.id = maxId + 1;
            Orders.Add(Order);

            WriteData(Orders);
            return Order;
        }

        /// <summary>
        /// Updates an existing Order
        /// </summary>
        /// <param name="id"></param>
        /// <param name="Order"></param>
        /// <returns></returns>
        public Order Save(int id, Order Order)
        {
            // Read in the existing Orders
            var Orders = this.Retrieve();

            // Locate and replace the item
            var itemIndex = Orders.FindIndex(p => p.id == Order.id);
            if (itemIndex > 0)
            {
                Orders[itemIndex] = Order;
            }
            else
            {
                return null;
            }

            WriteData(Orders);
            return Order;
        }

        public Order GetOrder(int orderId)
        {
            // Read in the existing Orders
            var Orders = this.Retrieve();
            var itemIndex = Orders.FindIndex(p => p.id == orderId);
            if (itemIndex >= 0)
            {
                return Orders[itemIndex];
            }
            else
            {
                return null;
            }
        }
        public List<Order> GetOrder()
        {
            // Read in the existing Orders
            var Orders = this.Retrieve();
            return Orders;
        }

        /// <summary>
        /// Retrieves the list of Orders from the File held in json
        /// </summary>
        /// <returns></returns>
        private List<Order> Retrieve()
        {            
            var filePath = HostingEnvironment.MapPath(@"~/App_Data/Order.json");

            var json = System.IO.File.ReadAllText(filePath);

            var Orders = JsonConvert.DeserializeObject<List<Order>>(json);

            return Orders;
        }

        /// <summary>
        /// Writes orders list to the Order.json file. 
        /// </summary>
        /// <param name="Orders"></param>
        /// <returns></returns>
        private bool WriteData(List<Order> Orders)
        {
            // Write out the Json
            var filePath = HostingEnvironment.MapPath(@"~/App_Data/Order.json");            

            var json = JsonConvert.SerializeObject(Orders, Formatting.Indented);
            System.IO.File.WriteAllText(filePath, json);

            return true;
        }

        

    }
}