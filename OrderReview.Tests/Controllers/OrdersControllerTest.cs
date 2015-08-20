using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net.Http;
using System.Web.Http;
using NUnit.Framework;
using OrderReview.Controllers;
using OrderReview.Models;
using Moq;

namespace OrderReview.Tests.Controllers
{
    [TestFixture, Explicit]
    class OrdersControllerTest
    {       
        [Test, Explicit]
        public void GetOrderWithId()
        {
            //Arrange 
            var mock = new Mock<IOrderRepository>();
            var controller = new OrdersController(mock.Object);
            mock.Setup(x => x.GetOrder(3)).Returns(new Order { id = 3 });

            //Act
            var actionResult = controller.Get(3);
            
            //Assert
            Assert.IsNotNull(actionResult);
            Assert.AreEqual(3, actionResult.id);            
        }
    }
}
