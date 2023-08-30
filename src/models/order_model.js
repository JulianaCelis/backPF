const Sequelize = require('sequelize');
const sequelize = require('../sequelize');

const Order = sequelize.define('order', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  userId: {
    type: Sequelize.UUID,
    allowNull: false,
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'Pending',
  },
  shippingAddress: {
    type: Sequelize.STRING, 
    allowNull: true, 
  },
});

module.exports = Order;
