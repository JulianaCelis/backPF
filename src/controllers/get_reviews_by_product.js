const { Reviews, Products } = require('../db.js');

async function getReviewsByProduct(productId) {
  try {
    const product = await Products.findByPk(productId, {
      include: {
        model: Reviews,
        as: 'reviews',
      },
    });

    if (!product) {
      return { error: 'Producto no encontrado' }; 
    }

    return product.reviews;
  } catch (error) {
    console.error('Error al obtener las reseñas por producto:', error);
    return { error: 'Error al obtener las reseñas por producto' };
  }
}

module.exports = getReviewsByProduct;
