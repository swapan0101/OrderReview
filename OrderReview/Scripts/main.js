'use strict';

(function() {
  var ORDER_INDEX_URL = 'http://localhost:59403/api/orders';
  var $ = window.jQuery;
  var Router = window.Router;
  var Handlebars = window.Handlebars;

  var Resource = function(resourceUrl) {
    this.url = resourceUrl;
  };

  Resource.prototype.index = function() {
    return $.getJSON(this.url);
  };

  Resource.prototype.get = function(id) {
    return $.getJSON(this.url + '/' + id);
  };

  var App = function() {
    this.resource = new Resource(ORDER_INDEX_URL);
    this.$orders = $('#orders');
    this.$orderDetail = $('#order-details');
    this.initTemplates();
    this.initRouter();

  };

  App.prototype.displayDetailsMode = function() {
    $('.row.orders').addClass('hidden');
    $('.row.order-details').removeClass('hidden');
  };

  App.prototype.displayIndexMode = function() {
    $('.row.orders').removeClass('hidden');
    $('.row.order-details').addClass('hidden');
  };

  App.prototype.initRouter = function() {
    this.routes = {
      '/': this.renderOrders.bind(this),
      '/orders/view/:orderId': this.renderOrderDetail.bind(this)
    };
    this.router = new Router(this.routes);
    this.router.init('/');
  };

  App.prototype.reset = function() {
    this.renderOrders();
    this.displayIndexMode();
  };

  App.prototype.initTemplates = function() {
    this.orderPreviewTemplate = Handlebars.compile($('#order-preview-template').html());
    this.orderDetailTemplate = Handlebars.compile($('#order-detail-template').html());
  };

  App.prototype.renderOrders = function() {
    console.log('Render Orders');
    this.resource.index().done(function(orders) {
      console.log('Render Orders');
      this.$orders.html(this.orderPreviewTemplate(orders));
      this.displayIndexMode();
    }.bind(this)).fail(function(error) {
      console.log('ERROR', error);
    });
  };

  App.prototype.renderOrderDetail = function(orderId) {
    this.resource.get(orderId).done(function(order) {
      this.$orderDetail.html(this.orderDetailTemplate(order));
      this.displayDetailsMode();
    }.bind(this));
  };

  $(function() {
    var app = new App();
    window.myOrderApp = window.myOrderApp || app;
  });
})();

