const Cart = require('../../models/Cart');
const Product = require('../../models/Product');


const getCart = async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      
      const userId = req.user.id;

      const userCart = await getUserCart(userId);

      res.status(200).json({ cart: userCart });
    } else {
      // Usuario no autenticado
      
      const tempCart = await getTempCartFromSession(req);

      // Envía el carrito temporal como respuesta
      res.status(200).json({ cart: tempCart });
    }
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
      
      const product = await Product.findByPk(cartItem.productId);
      
      userCart.push({
        productId: cartItem.productId,
        quantity: cartItem.quantity,
        // ... otras propiedades del producto que necesites
      });
    }

    return userCart;
  } catch (error) {
    console.error('Error al obtener el carrito del usuario desde la base de datos:', error);
    throw new Error('Error al obtener el carrito del usuario.');
  }
};

const getTempCartFromSession = async (req) => {
const session = require('express-session');
app.use(session({ secret: 'tu_secreto', resave: false, saveUninitialized: true }));

// Función para obtener el carrito temporal de la sesión
const getTempCartFromSession = (req) => {
  if (req.session && req.session.tempCart) {
    return req.session.tempCart;
  } else {
    
    return [];
  }
};
}
module.exports =
  getCart,
  getUserCart, 
  getTempCartFromSession
