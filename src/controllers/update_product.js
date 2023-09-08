const { Products } = require('../db');

async function updateProduct(req, res) {
  try {
    const productId = req.params.productId;
    const updatedData = req.body;

    // Busca el producto por su ID
    const product = await Products.findByPk(productId);

    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    // Verifica si el usuario autenticado es el propietario del producto
    if (product.userId !== req.user.id) {
      return res.status(403).json({ error: 'No tienes permiso para actualizar este producto' });
    }

    // Actualiza los datos del producto
    await product.update(updatedData);

    return res.status(200).json({ message: 'Producto actualizado con éxito' });
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
}

module.exports = updateProduct;

