const express = require('express');
const CartTempRouter = express.Router();
const { addToTempCart, removeFromTempCart} = require('../controllers/index');
const { getCart } = require('../controllers/cartController/get_cart');

CartTempRouter.get('/', getCart);

CartTempRouter.post('/add/:productId', addToTempCart);

CartTempRouter.delete('/temp-cart/remove/:productId', removeFromTempCart);

module.exports = CartTempRouter;