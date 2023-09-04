const express = require('express');
const categoryRouter = express.Router();
const { Category } = require('../db');
const { setupCategories } = require('../controllers/index');

const checkCategoriesSetup = async (req, res, next) => {
  try {
    // Verifica si ya existen categorías en la base de datos
    const categories = await Category.findAll({
      include: [{ model: Category, as: 'subcategories' }],
    });

    // Si no hay categorías en la base de datos, configúralas
    if (categories.length === 0) {
      await setupCategories(Category);
    }

    next();
  } catch (error) {
    console.error('Error al verificar las categorías:', error);
    res.status(500).json({ message: 'Error al verificar las categorías.' });
  }
};

categoryRouter.get('/', checkCategoriesSetup, async (req, res) => {
  try {
    const updatedCategories = await Category.findAll({
      include: [{ model: Category, as: 'subcategories' }],
    });

    res.status(200).json(updatedCategories);
  } catch (error) {
    console.error('Error al obtener las categorías:', error);
    res.status(500).json({ message: 'Error al obtener las categorías.' });
  }
});

module.exports = categoryRouter;
