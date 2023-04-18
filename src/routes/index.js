const productsRouter = require("./products.router");
const cartRouter = require("./cart.router");
const dbCartRouter= require("../dao/dbManager/carts.controller")
const dbProductsRouter= require("../dao/dbManager/products.controller")
const messageController= require("../dao/dbManager/messages.controller")
const router = app => {
  app.use('/api/products', productsRouter);
  app.use('/api/cart', cartRouter);
  app.use('/api/dbCarts', dbCartRouter);
  app.use('/api/dbProducts', dbProductsRouter);
  app.use('/api/messages', messageController);
}

module.exports = router