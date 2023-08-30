const { Product } = require('../db.js');

async function createProduct(req, res) {
  try {
    const { title, image, summary, price, stock } = req.body;

    const newProduct = await Product.create({
      title,
      image,
      summary,
      price,
      stock,
    });

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear el producto' });
  }
}

module.exports = {
  createProduct,
};
