require('dotenv').config();
const Sequelize = require('sequelize');
const models = require('./models');
const { Product, User, Order } = models;

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  logging: false, 
});


sequelize
  .authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida correctamente');
  })
  .catch((error) => {
    console.error('Error en la conexión a la base de datos:', error);
  });



Product.belongsToMany(User, { through: 'CartItem' });
User.belongsToMany(Product, { through: 'CartItem' });

Order.belongsTo(User);
User.hasMany(Order);


module.exports = {
  sequelize,
  models,
};
