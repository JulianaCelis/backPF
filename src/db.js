require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs');
const path = require('path');

const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_NAME
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/ecommerce`, {
  logging: false,
  native: false,
});

const basename = path.basename(__filename);
const modelDefiners = [];

fs.readdirSync(path.join(__dirname, 'models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, 'models', file)));
  });

modelDefiners.forEach(model => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);


const { Products, User, Order, Category, Review, ShippingAddress, OrderItem, Cart} = sequelize.models;

// // Asociaciones de Products y Category
// Products.belongsToMany(Category, { through: 'ProductCategory' });
// Category.belongsToMany(Products, { through: 'ProductCategory' });

// Asociaciones de Review y Product
Review.belongsTo(Products, { foreignKey: 'productId' });
Products.hasMany(Review, { foreignKey: 'productId' });

// Asociaciones de Review y User
Review.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Review, { foreignKey: 'userId' });

// Asociaciones de Order y User
User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

// Asociaciones de Product y User para usuarios que pueden subir productos
User.hasMany(Products, {
  as: 'UploadedProducts',
  foreignKey: 'id', 
});

// Asociaciones de Product y User para el carrito de compras
Products.belongsToMany(User, { through: 'CartItem' });
User.belongsToMany(Products, { through: 'CartItem' });

// Asociaciones de User y ShippingAddress
User.hasMany(ShippingAddress, {
  as: 'shippingAddresses',
  foreignKey: 'id', 
});

// Asociaciones de Order y OrderItem
Order.hasMany(OrderItem, { foreignKey: 'orderId' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

// Asociaciones de Product y OrderItem
Products.hasMany(OrderItem, { foreignKey: 'productId' });
OrderItem.belongsTo(Product, { foreignKey: 'productId' });

// Asociaciones de Cart
Cart.belongsTo(User, { foreignKey: 'userId' });
Cart.belongsTo(Products, { foreignKey: 'productId' });

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
