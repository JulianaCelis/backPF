'use strict';
const { v4: uuidv4 } = require('uuid');
const productsData = require('./MOCK_DATA.json');
const { Products, Category, Subcategory } = require('../src/db');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      for (const productData of productsData) {
        const { title, summary, price, stock, images, categoryIds, subcategoryIds } = productData;

        // Crear el producto primero
        const newProduct = await Products.create({
          id: uuidv4(),
          title,
          summary,
          price,
          stock,
          images,
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        // Asociar el producto con categorías
        if (categoryIds && categoryIds.length > 0) {
          const categories = await Category.findAll({
            where: {
              id: categoryIds,
            },
          });
          await newProduct.addCategories(categories);
        }

        // Asociar el producto con subcategorías
        if (subcategoryIds && subcategoryIds.length > 0) {
          const subcategories = await Subcategory.findAll({
            where: {
              id: subcategoryIds,
            },
          });
          await newProduct.addSubcategories(subcategories);
        }
      }

      console.log('Productos configurados con éxito.');
    } catch (error) {
      console.error('Error al configurar los productos:', error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Eliminar datos si es necesario
  },
};
