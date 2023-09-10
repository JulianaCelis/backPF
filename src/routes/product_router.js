const express = require('express');
const productRouter = express.Router();
const {getProducts, createProduct, updateProduct, getProductById} = require('../controllers/index');
const { Products } = require('../db.js');
const authenticateToken = require('../middlewares/authMiddleware.js');


productRouter.get('/', async (req, res) => {
  try {
    const products = await getProducts();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la lista de productos' });
  }
});

productRouter.get('/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;

    const product = await getProductById(productId);

    if (product.error) {
      return res.status(404).json({ error: product.error });
    }

    return res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el producto por ID' });
  }
});


productRouter.post('/', authenticateToken, createProduct);

productRouter.delete('/:productId', authenticateToken, async (req, res) => {
  try {
    const productId = req.params.productId;
    const userId = req.user.id; 

    const product = await Products.findOne({
      where: { id: productId, userId: userId },
    });

    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    await product.destroy();

    return res.status(204).json(); 
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
});

productRouter.put('/:productId', authenticateToken, updateProduct);

module.exports = productRouter;
