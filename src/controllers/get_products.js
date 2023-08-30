const { Product } = require('../db.js');

async function getProducts(req, res) {
  try {
    const products = await Product.findAll();
    console.log('este es product', JSON.stringify(Product, null, 2));
    if (products.length === 0) {
      res.status(404).json({ message: 'No se encontraron productos' });
    } else {
      res.json(products);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la lista de productos' });
  }
}

module.exports = getProducts;
