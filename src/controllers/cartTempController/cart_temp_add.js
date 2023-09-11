const addToTempCart = async (req, res) => {
    try {
      const { productId, quantity } = req.body;
      
      const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ error: 'El producto no existe.' });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ error: 'No hay suficiente stock disponible.' });
    }
      let tempCart = req.session.tempCart || [];
  
      
      const existingCartItem = tempCart.find(item => item.productId === productId);
  
      if (existingCartItem) {
        
        existingCartItem.quantity += quantity;
      } else {
        
        tempCart.push({ productId, quantity });
      }
  
      req.session.tempCart = tempCart;
  
      res.status(200).json({ message: 'Producto agregado al carrito temporal.' });
    } catch (error) {
      console.error(error);
      
      res.status(500).json({ error: 'Error al agregar producto al carrito temporal.' });
    }
  };

  module.exports = addToTempCart;