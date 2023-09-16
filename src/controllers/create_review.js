const { Reviews, Products, User } = require('../db.js');

async function createReview(req, res) {
  const { id } = req.params; // Obtén el ID del producto de la URL
  const { userId, comment, rating } = req.body;

  try {
    // Verifica si el producto existe
    const product = await Products.findByPk(id);

    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado.' });
    }

    // Crea la reseña
    await Reviews.create({
      comment,
      rating,
      productId: product.id, // Asigna el ID del producto desde la URL
      userId, // Asigna el ID del usuario desde el cuerpo de la solicitud
    });

    console.log('Reseña agregada con éxito.');
    res.status(201).json({ message: 'Reseña agregada con éxito.' });
  } catch (error) {
    console.error('Error al agregar la reseña:', error);
    res.status(500).json({ error: 'Error al agregar la reseña.' });
  }
}

module.exports = createReview;



