const Review = require('../models/Review');

async function getAllReviews() {
  try {
    const reviews = await Review.findAll();
    return reviews;
  } catch (error) {
    console.error('Error al obtener las reseñas:', error);
    return [];
  }
}

module.exports = getAllReviews;