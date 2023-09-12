const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'cart',
    {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: {
      min: 1, 
    },
  },
}, {
  validate: {
    async userExists() {
      const user = await User.findByPk(this.userId);
      if (!user) {
        throw new Error('El usuario no existe.');
      }
    },
    async productExists() {
      const product = await Product.findByPk(this.productId);
      if (!product) {
        throw new Error('El producto no existe.');
      }
    },
    async uniqueProduct() {
      const existingCart = await Cart.findOne({
        where: {
          userId: this.userId,
          productId: this.productId,
        },
      });
      if (existingCart) {
        throw new Error('El producto ya está en el carrito.');
      }
    },
  },
});
}
