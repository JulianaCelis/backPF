const express = require('express');
const categoryRouter = express.Router();
const { Category, Subcategory } = require('../db');


categoryRouter.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [{ model: Subcategory, as: 'subcategories' }],
    });

    res.status(200).json(categories);
  } catch (error) {
    console.error('Error al obtener las categorías y subcategorías:', error);
    res.status(500).json({ message: 'Error al obtener las categorías y subcategorías.' });
  }
});

module.exports = categoryRouter;
