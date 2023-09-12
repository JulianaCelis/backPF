const express = require('express');
const cartRouter = express.Router();
const {getCart, addToCart, removeFromCart, checkout} = require('../controllers/index');

cartRouter.get('/cart', getCart);

cartRouter.post('/cart/add/:productId', addToCart);

cartRouter.delete('/cart/remove/:productId', removeFromCart);

cartRouter.post('/cart/checkout', checkout);

module.exports = cartRouter;