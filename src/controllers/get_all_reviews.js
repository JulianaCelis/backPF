const { Reviews } = require('../db.js');

async function getAllReviews() {
  try {
    const reviews = await Reviews.findAll();
    return reviews;
  } catch (error) {
    console.error('Error al obtener las reseñas:', error);
    return [];
  }
}

module.exports = getAllReviews;