const { Products, Cart } = require('../../db');

const getTempCartFromSession = (req) => {
  if (req.session && req.session.tempCart) {
    return req.session.tempCart;
  } else {
    return [];
  }
};

const getCart = async (req, res) => {
  try {
    const userId = req.user.id; // Obtener el ID del usuario autenticado

    // Obtener el carrito del usuario desde la base de datos
    const userCart = await getUserCart(userId);

    res.status(200).json({ cart: userCart });
  } catch (error) {
    console.error('Error al obtener el carrito del usuario:', error);
    res.status(500).json({ error: 'Error al obtener el carrito del usuario.' });
  }
};

const getUserCart = async (userId) => {
  try {
    const cartItems = await Cart.findAll({
      where: {
        userId,
      },
    });

    const userCart = [];

    for (const cartItem of cartItems) {
      const product = await Products.findByPk(cartItem.productId); // Cambio de Products a Products
      userCart.push({
        productId: cartItem.productId,
        quantity: cartItem.quantity,
        product: product 
      });
    }

    return userCart;
  } catch (error) {
    console.error('Error al obtener el carrito del usuario desde la base de datos:', error);
    throw new Error('Error al obtener el carrito del usuario.');
  }
};

module.exports = {
  getCart,
  getUserCart,
  getTempCartFromSession,
};

