const Review = require('../models/Review');

async function addRating(reviewId, rating) {
  try {
    const review = await Review.findByPk(reviewId);
    if (!review) {
      throw new Error('Reseña no encontrada');
    }

    // Actualiza la calificación de la reseña
    review.rating = rating;
    await review.save();

    console.log('Calificación agregada correctamente.');
  } catch (error) {
    console.error('Error al agregar la calificación:', error);
  }
}

module.exports = addRating;