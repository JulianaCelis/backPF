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

    return res.status(201).json(newProduct); 
  } catch (error) {
    console.error('Error al crear el producto:', error);
    res.status(500).json({ error: 'Error al crear el producto' }); 
  }
}

module.exports = createProduct;


