const { Reviews } = require('../db.js');

async function deleteReview(req, res) {
  const { id } = req.params;

  try {
    // Verifica si la revisión existe
    const review = await Reviews.findByPk(id);

    if (!review) {
      return res.status(404).json({ error: 'Review no encontrada.' });
    }

    // Elimina la revisión
    await review.destroy();

    console.log('Review eliminada con éxito.');
    res.status(200).json({ message: 'Review eliminada con éxito.' });
  } catch (error) {
    console.error('Error al eliminar la review:', error);
    res.status(500).json({ error: 'Error al eliminar la review.' });
  }
}

module.exports = deleteReview;
