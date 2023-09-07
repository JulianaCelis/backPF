const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ShippingAddress = sequelize.define('shippingAddress', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    addressLine1: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'La dirección es obligatoria.',
        },
      },
    },
    addressLine2: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: {
          msg: 'La dirección es obligatoria.',
        },
      },
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'La ciudad es obligatoria.',
        },
      },
    },
    postalCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'El país es obligatorio.',
        },
      },
    },
    userId: {
      type: DataTypes.UUID, // Asegúrate de que coincida con el tipo de datos en la tabla User
      allowNull: false, // O cualquier otra restricción que necesites
    },
  });

  return ShippingAddress;
};
