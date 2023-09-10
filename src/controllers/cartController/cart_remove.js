const removeFromCart = async (req, res) => {
    try {
      const { productId } = req.params;
      const userId = req.user.id; 
      
      const deletedRows = await Cart.destroy({
        where: {
          userId,
          productId,
        },
      });
  
      if (deletedRows === 0) {
        return res.status(404).json({ error: 'El producto no estaba en el carrito.' });
      }
  
      
      res.status(200).json({ message: 'Producto eliminado del carrito.' });
    } catch (error) {
      console.error(error);
      
      res.status(500).json({ error: 'Error al eliminar producto del carrito.' });
    }
  };

  module.exports = removeFromCart