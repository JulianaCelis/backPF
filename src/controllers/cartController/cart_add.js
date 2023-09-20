const { Products, User, Cart } = require('../../db'); // Asegúrate de importar los modelos necesarios desde 'db'

const addToCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;
    const userId = req.user.id;

    const product = await Products.findByPk(productId);

    if (!product) {
      return res.status(404).json({ error: 'El producto no existe.' });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ error: 'No hay suficiente stock disponible.' });
    }

    const existingCartItem = await Cart.findOne({
      where: {
        userId,
        productId,
      },
    });

    if (existingCartItem) {
      existingCartItem.quantity += quantity;
      await existingCartItem.save();
    } else {
      await Cart.create({
        userId,
        productId,
        quantity,
      });
    }

    res.status(200).json({ message: 'Producto agregado al carrito.' });
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: 'Error al agregar producto al carrito.' });
  }
};

module.exports = addToCart;
