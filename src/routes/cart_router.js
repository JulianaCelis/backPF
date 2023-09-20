const express = require('express');
const cartRouter = express.Router();
const { addToCart, removeFromCart, checkout } = require('../controllers/index');
const { authenticateToken } = require('../middlewares/authMiddleware.js');
const { getCart } = require('../controllers/cartController/get_cart');

cartRouter.get('/', authenticateToken, getCart);

cartRouter.post('/add/:productId', authenticateToken, addToCart);

cartRouter.delete('/remove/:productId', authenticateToken, removeFromCart);

cartRouter.post('/checkout', checkout);

module.exports = cartRouter;
