const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    birthdate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    wantsNotifications: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    isSeller: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    storeName: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isSellerStore(value) {
          if (this.isSeller && !value) {
            throw new Error('El nombre de la tienda es obligatorio para vendedores');
          }
        },
      },
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    active: {
      type: DataTypes.BOOLEAN, 
      allowNull: false,
      defaultValue: true, 
    },
  });

  return User;
};