const users = require('./users/users.service.js');
const productList = require('./product-list/product-list.service.js');
const products = require('./products/products.service.js');
const cart = require('./cart/cart.service.js');
const orders = require('./orders/orders.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(productList);
  app.configure(products);
  app.configure(cart);
  app.configure(orders);
};
