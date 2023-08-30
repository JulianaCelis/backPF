const express = require('express');
const router = express.Router();
const productsController = require('../controllers/index');

// Ruta para obtener la lista de productos
router.get('/products', async (req, res) => {
  try {
    const products = await productsController.getProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la lista de productos' });
  }
});

module.exports = router;