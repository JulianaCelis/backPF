const express = require('express');
const productRouter = express.Router();
const {getProduct, createProduct} = require('../controllers/index');


productRouter.get('/', async (req, res) => {
  try {
    const products = await getProduct();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la lista de productos' });
  }
});


productRouter.post('/', async (req, res) => {
  try {
    const newProduct = await createProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear el producto' });
  }
});

module.exports = productRouter;
