const Review = require('../models/Review');

const updateReview = async (req, res) => {
  const { id } = req.params;
  const { comment, rating } = req.body;

  try {
    const review = await Review.findByPk(id);

    if (!review) {
      return res.status(404).json({ error: 'Reseña no encontrada.' });
    }

    // Actualizar los campos de la reseña
    review.comment = comment;
    review.rating = rating;

    await review.save();

    return res.json(review);
  } catch (error) {
    return res.status(500).json({ error: 'Error al actualizar la reseña.' });
  }
};

module.exports = updateReview;