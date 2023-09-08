const { Products, Category, Subcategory } = require('../db.js');

async function getProductById(productId) {
  try {
    const product = await Products.findByPk(productId, {
      include: [Category, Subcategory],
    });

    if (!product) {
      return { error: 'Producto no encontrado' };
    }

    return product;
  } catch (error) {
    console.error(error);
    return { error: 'Error al obtener el producto por ID' };
  }
}

module.exports = getProductById;
