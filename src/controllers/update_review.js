const { Reviews } = require('../db.js');

async function updateReview(req, res) {
  const { id } = req.params; // Obtén el ID de la revisión de la URL
  const { comment, rating } = req.body;

  try {
    // Verifica si la revisión existe
    const review = await Reviews.findByPk(id);

    if (!review) {
      return res.status(404).json({ error: 'Revisión no encontrada.' });
    }

    // Actualiza la revisión con los nuevos datos
    await review.update({
      comment,
      rating,
    });

    console.log('Revisión actualizada con éxito.');
    res.status(200).json({ message: 'Revisión actualizada con éxito.' });
  } catch (error) {
    console.error('Error al actualizar la revisión:', error);
    res.status(500).json({ error: 'Error al actualizar la revisión.' });
  }
}

module.exports = updateReview;
