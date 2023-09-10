const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Subcategory = sequelize.define('Subcategory', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Subcategory.associate = (models) => {
    Subcategory.belongsTo(models.Category, {
      foreignKey: 'categoryId',
      allowNull: false,
    });
  };

  return Subcategory;
};
