const paymentController = require('./payment/create_payment');
const checkout = async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await User.findByPk(userId);
      
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado.' });
      }
  
      const userCart = await getUserCart(userId);
  
      if (!userCart || userCart.length === 0) {
        return res.status(400).json({ error: 'El carrito está vacío.' });
      }
  
      // Verifica si los productos en el carrito todavía están disponibles y actualiza el stock
      const productsToUpdateStock = [];
      
      for (const cartItem of userCart) {
        const product = await Product.findByPk(cartItem.productId);
        
        if (!product || product.stock < cartItem.quantity) {
          return res.status(400).json({ error: 'Uno o más productos en el carrito no están disponibles en la cantidad deseada.' });
        }
  
        // Actualiza el stock del producto (resta la cantidad comprada)
        product.stock -= cartItem.quantity;
        productsToUpdateStock.push(product.save());
      }
  
      
      const order = await Order.create({ userId });
  
      for (const cartItem of userCart) {
        const product = await Product.findByPk(cartItem.productId);

      
      const subtotal = product.price * cartItem.quantity;

        await OrderItem.create({
          orderId: order.id,
          productId: cartItem.productId,
          quantity: cartItem.quantity,
          unitPrice: product.price,
          subtotal, 
        });
      }
      const returnUrl = 'https://tu-sitio.com/retorno-de-pago'; // Cambiar esto por la URL de retorno
      const initPoint = await paymentController.createPayment(userCart, returnUrl, userId);
  
      // Redirige al usuario al proceso de pago de MercadoPago
      res.redirect(initPoint);
      
      await clearUserCart(userId);
  
      
      res.status(200).json({ message: 'Compra exitosa.' });
    } catch (error) {
      console.error(error);
      
      res.status(500).json({ error: 'Error en el proceso de compra.' });
    }
  };
  
  const getUserCart = async (userId) => {
    try {
      
      const cartItems = await Cart.findAll({
        where: {
          userId,
        },
        include: [Product], 
      });
  
      if (!cartItems || cartItems.length === 0) {
        return null;
      }
      return cartItems.map(cartItem => ({
        productId: cartItem.productId,
        quantity: cartItem.quantity,
        // ... otras propiedades del producto que necesites
      }));
    } catch (error) {
      console.error(error);
      throw new Error('Error al obtener el carrito del usuario.');
    }
  };
  
  const clearUserCart = async (userId) => {
    try {
     
      await Cart.destroy({
        where: {
          userId,
        },
      });
  
      return true;
    } catch (error) {
      console.error(error);
      throw new Error('Error al borrar el carrito del usuario.');
    }
  };
  
  module.exports = checkout
