const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'products',
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'El título es obligatorio.',
          },
        },
      },
      summary: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
          len: {
            args: [10, 500],
            msg: 'El resumen debe tener entre 10 y 500 caracteres.',
          },
        },
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          isNumeric: {
            msg: 'El precio debe ser un número.',
          },
          min: {
            args: [0],
            msg: 'El precio debe ser mayor o igual a 0.',
          },
        },
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          isInt: {
            msg: 'El stock debe ser un número entero.',
          },
          min: {
            args: [0],
            msg: 'El stock debe ser mayor o igual a 0.',
          },
        },
      },
    },
  );
};
