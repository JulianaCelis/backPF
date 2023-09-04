const Review = require('../models/Review');

const deleteReview = async (req, res) => {
  const { id } = req.params;

  try {
    const review = await Review.findByPk(id);

    if (!review) {
      return res.status(404).json({ error: 'Reseña no encontrada.' });
    }

    await review.destroy();

    return res.json({ message: 'Reseña eliminada con éxito.' });
  } catch (error) {
    return res.status(500).json({ error: 'Error al eliminar la reseña.' });
  }
};

module.exports = deleteReview;