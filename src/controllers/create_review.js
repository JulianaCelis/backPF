const Review = require('../models/Review');

async function createReview(product, user, comment) {
  try {
    await Review.create({
      product,
      user,
      comment,
      rating,
    });
    console.log('Reseña agregada con éxito.');
  } catch (error) {
    console.error('Error al agregar la reseña:', error);
  }
}

module.exports = createReview;