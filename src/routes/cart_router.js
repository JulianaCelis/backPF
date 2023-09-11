const express = require('express');
const cartRouter = express.Router();
const {getCart, addToCart, removeFromCart, checkout} = require('../controllers/index');

router.get('/cart', getCart);

router.post('/cart/add/:productId', addToCart);

router.delete('/cart/remove/:productId', removeFromCart);

router.post('/cart/checkout', checkout);

module.exports = cartRouter;