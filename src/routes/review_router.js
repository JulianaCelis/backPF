const express = require('express');
const ReviewRouter = express.Router();
const {getAllReviews, getReviewsByProduct, createReview, updateReview,deleteReview,} = require ('../controllers/index');
const {authenticateToken} = require('../middlewares/authMiddleware.js');


ReviewRouter.get('/', async (req, res) => {
    try {
      const reviews = await getAllReviews();
      res.json(reviews);
    } catch (error) {
      console.error('Error al obtener las reseñas:', error);
      res.status(500).json({ error: 'Error al obtener las reseñas' });
    }
  });
  
  ReviewRouter.get('/product/:id', async (req, res) => {
    const productId = req.params.id;
    
    try {
      const reviews = await getReviewsByProduct(productId);
      res.json(reviews);
    } catch (error) {
      console.error('Error al obtener las reseñas por producto:', error);
      res.status(500).json({ error: 'Error al obtener las reseñas por producto' });
    }
  });
  
  ReviewRouter.post('/:id', authenticateToken, createReview);
  ReviewRouter.put('/:id', updateReview);
ReviewRouter.delete('/:id', deleteReview);

module.exports = ReviewRouter;