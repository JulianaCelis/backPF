const Sequelize = require('sequelize');
const sequelize = require('../sequelize');

const Product = sequelize.define('product', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  image: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  summary: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  stock: {
    type: Sequelize.INTEGER, 
    allowNull: false,
    defaultValue: 0, 
  },
});

module.exports = Product;
