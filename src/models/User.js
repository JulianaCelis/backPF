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
  });

  return User;
};
