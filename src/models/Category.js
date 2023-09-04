const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Category = sequelize.define('Category', {
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

  // Define la relación de subcategorías
  Category.hasMany(Category, {
    as: 'subcategories',
    foreignKey: 'id', 
  });

  // Define la relación de categorías padre
  Category.belongsTo(Category, {
    as: 'parent',
    foreignKey: 'id', 
  });

  return Category;
};
