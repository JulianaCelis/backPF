const { Products } = require('../db.js');

async function createProduct(req, res) {
  try {
    const { title, image, summary, price, stock } = req.body;

    const newProduct = await Products.create({
      title,
      image,
      summary,
      price,
      stock,
    });

    return newProduct;
  } catch (error) {
    console.error('Error al crear el producto:', error);
    return { error: 'Error al crear el producto' };
  }
}

module.exports = createProduct;

