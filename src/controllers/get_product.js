const { Product } = require('../db.js');

async function getProduct(req, res) {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la lista de productos' });
  }
}

module.exports = {
  getProduct,
};
