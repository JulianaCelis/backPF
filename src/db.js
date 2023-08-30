require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_NAME
} = process.env;

console.log(DB_HOST);

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/ecommerce`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
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

// Definición de asociaciones
const { Product, User, Order, Category, Review } = sequelize.models;

// Asociaciones de Product y Category
Product.belongsToMany(Category, { through: 'ProductCategory' });
Category.belongsToMany(Product, { through: 'ProductCategory' });

// Asociaciones de Review y Product
Review.belongsTo(Product);
Product.hasMany(Review);

// Asociaciones de Order y User
Order.belongsTo(User);
User.hasMany(Order);

//Cart

Product.belongsToMany(User, { through: 'CartItem' });
User.belongsToMany(Product, { through: 'CartItem' });

module.exports = {
  ...sequelize.models,
  conn: sequelize,     
};
