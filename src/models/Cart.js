const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'cart',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, 
        primaryKey: true,
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID, 
        allowNull: false,
      },
      productId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: {
          min: 1,
        },
      },
    }
  );
};
