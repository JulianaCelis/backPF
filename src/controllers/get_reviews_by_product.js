const Review = require('../models/Review');

async function getReviewsByProduct(product) {
  try {
    const reviews = await Review.findAll({
      where: {
        product,
      },
    });
    return reviews;
  } catch (error) {
    console.error('Error al obtener las reseñas por producto:', error);
    return [];
  }
}

module.exports = getReviewsByProduct;