'use strict';

(function () {
    var bootstrapJSON = [{
        id: '1',
        customerName: 'GeorgiaDome',
        expectedDeliveryDate: '2015-09-15T03:00:00-04:00',
        orderDate: '2015-08-18T03:00:00-04:00',
        orderNumber: '1',
        orderStatus: 'InProgress',
        productName: 'Main Screen',
        salesPersonName: 'George Washington'
    }, {
        id: '2',
        customerName: 'WhiteHouse',
        expectedDeliveryDate: '2015-09-15T03:00:00-04:00',
        orderDate: '2015-08-18T03:00:00-04:00',
        orderNumber: '1',
        orderStatus: 'InProgress',
        productName: 'Presidential Screen',
        salesPersonName: 'John Doe'
    }, {
        id: '3',
        customerName: 'HomeDepot',
        expectedDeliveryDate: '2015-09-15T03:00:00-04:00',
        orderDate: '2015-08-18T03:00:00-04:00',
        orderNumber: '1',
        orderStatus: 'InProgress',
        productName: 'Tool Display',
        salesPersonName: 'Billy Blank'
    }

    ];


    var $ = window.jQuery;

    (function () {
        var Resource = function (indexUrl, detailUrl) {
            this.indexUrl = indexUrl;
            this.detailUrl = detailUrl;
        };

        Resource.prototype.getIndex = function (cb) {
            return $.ajax({
                url: this.indexUrl
            }).done(cb);
        };
        
        Resource.prototype.getOrder = function (id, cb) {
            return $.ajax({
                url: this.detailUrl + id
            }).done(cb).fail( function() {(console.log(error, id))});

        };



        window.myResource = window.myResource || Resource;
    })();

    var Resource = new window.myResource("http://localhost:59906/api/orders", "http://localhost:59906/api/orders/");

    var Router = window.Router;
    var Handlebars = window.Handlebars;
    var _ = window._;


    var App = function () {
        this.$orders = $('#orders');
        this.$orderDetail = $('#order-details');
        this.data = bootstrapJSON;
        this.initTemplates();
        this.initRouter();
        this.renderOrders();
    };

    App.prototype.initRouter = function () {
        this.routes = {
            '/': this.reset.bind(this),
            '/orders/view/:orderId': this.renderOrderDetail.bind(this)
        };
        this.router = new Router(this.routes);
        this.router.init();
    };

    App.prototype.reset = function () {
        this.$orderDetail.html('');
    };

    App.prototype.initTemplates = function () {
        this.orderPreviewTemplate = Handlebars.compile($('#order-preview-template').html());
        this.orderDetailTemplate = Handlebars.compile($('#order-detail-template').html());
    };

    App.prototype.renderOrders = function () {
        console.log('Render Orders');
        
        Resource.getIndex(            
            function (result, self) {
                this.$orders.html(this.orderPreviewTemplate(result));                            
            }.bind(this)
        );
        //this.$orders.html(this.orderPreviewTemplate(this.data));
    };

    App.prototype.renderOrderDetail = function (orderId) {
        //var order = _.find(this.data, function (o) {
        //    return o.id === orderId;
        //});
        //console.log(order);        
        Resource.getOrder(orderId,
             function (order) {
                 this.$orderDetail.html(this.orderDetailTemplate(order));
             }.bind(this)
            )
    };

    $(function () {
        var app = new App();
        window.myOrderApp = window.myOrderApp || app;
    });
})();


