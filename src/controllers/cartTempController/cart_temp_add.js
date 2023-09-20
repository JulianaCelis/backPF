const { Products } = require('../../db'); 

const addToTempCart = async (req, res) => {
  try {
    const { productId } = req.params; 
    const { quantity } = req.body;

    // Validar que el producto exista
    const product = await Products.findByPk(productId); 

    if (!product) {
      return res.status(404).json({ error: 'El producto no existe.' });
    }

    // Validar que haya suficiente stock disponible
    if (product.stock < quantity) {
      return res.status(400).json({ error: 'No hay suficiente stock disponible.' });
    }

    // En lugar de usar req.session, puedes usar una variable local para mantener el carrito temporal
    let tempCart = [];

    // Buscar si el producto ya está en el carrito temporal
    const existingCartItem = tempCart.find(item => item.productId === productId);

    if (existingCartItem) {
      // Actualizar la cantidad si ya existe
      existingCartItem.quantity += quantity;
    } else {
      // Agregar un nuevo elemento al carrito temporal
      tempCart.push({ productId, quantity });
    }

    // En lugar de actualizar req.session.tempCart, simplemente retorna el carrito temporal actualizado
    res.status(200).json({ message: 'Producto agregado al carrito temporal.', tempCart });
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: 'Error al agregar producto al carrito temporal.' });
  }
};

module.exports = addToTempCart;
