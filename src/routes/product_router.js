const express = require('express');
const productRouter = express.Router();
const {getProducts, createProduct} = require('../controllers/index');
const authenticateToken = require('../middlewares/authMiddleware');


productRouter.get('/', async (req, res) => {
  try {
    const products = await getProducts();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la lista de productos' });
  }
});


productRouter.post('/', authenticateToken, createProduct);

module.exports = productRouter;
