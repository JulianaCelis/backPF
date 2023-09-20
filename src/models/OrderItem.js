const DataTypes = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define(
      'order',{
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  orderId: {
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
  },
  unitPrice: {
    type: DataTypes.FLOAT, 
    allowNull: false,
  },
  subtotal: { 
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});
}
