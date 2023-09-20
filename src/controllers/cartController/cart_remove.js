const { Cart } = require('../../db');

const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;
    const userId = req.user.id;

    const cartItem = await Cart.findOne({
      where: {
        userId,
        productId,
      },
    });

    if (!cartItem) {
      return res.status(404).json({ error: 'El producto no estaba en el carrito.' });
    }

    // Si no se especifica una cantidad o se establece en 0, eliminar una unidad del producto
    const quantityToRemove = quantity && quantity > 0 ? quantity : 1;

    if (cartItem.quantity <= quantityToRemove) {
      await cartItem.destroy();
    } else {
      cartItem.quantity -= quantityToRemove;
      await cartItem.save();
    }

    res.status(200).json({ message: 'Producto eliminado del carrito.' });
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: 'Error al eliminar producto del carrito.' });
  }
};

module.exports = removeFromCart;
