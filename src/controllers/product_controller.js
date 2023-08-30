const Product = require('../models/Product');


async function getProducts(req, res) {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la lista de productos' });
  }
}

module.exports = {
  getProducts,
};
