const removeFromTempCart = async (req, res) => {
    try {
      const { productId } = req.params;
      
      let tempCart = req.session.tempCart || [];
      const initialLength = tempCart.length;
  
      tempCart = tempCart.filter(item => item.productId !== parseInt(productId, 10));
  
      if (tempCart.length === initialLength) {
        return res.status(404).json({ error: 'El producto no estaba en el carrito.' });
      }
  
      req.session.tempCart = tempCart;

      res.status(200).json({ message: 'Producto eliminado del carrito temporal.' });
    } catch (error) {
      console.error(error);
      
      res.status(500).json({ error: 'Error al eliminar producto del carrito temporal.' });
    }
  };
  module.exports = removeFromTempCart