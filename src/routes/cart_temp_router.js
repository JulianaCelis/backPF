const express = require('express');
const CartTempRouter = express.Router();
const {getCart, addToTempCart, removeFromTempCart} = require('../controllers/index');

CartTempRouter.get('/temp-cart', getCart);

CartTempRouter.post('/temp-cart/add/:productId', addToTempCart);

CartTempRouter.delete('/temp-cart/remove/:productId', removeFromTempCart);

module.exports = CartTempRouter;