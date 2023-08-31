const { Products } = require('../db.js');

async function getProducts() {
  try {
    const products = await Products.findAll();
    if (products.length === 0) {
      return { message: 'No se encontraron productos' };
    }
    return products;
  } catch (error) {
    console.error(error);
    return { error: 'Error al obtener la lista de productos' };
  }
}

module.exports = getProducts;
