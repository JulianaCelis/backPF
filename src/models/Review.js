const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Reviews = sequelize.define('reviews', {
    id: {
      type: DataTypes.UUID, 
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN, 
      allowNull: false,
      defaultValue: true, 
    },
  });

  return Reviews;
};
