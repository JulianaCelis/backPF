const express = require('express');
const ReviewRouter = express.Router();
const {getAllReviews, getReviewsByProduct, createReview, updateReview,deleteReview,} = require ('../controllers/index');

// Definir las rutas usando los controladores
ReviewRouter.get('/reviews', getAllReviews);
ReviewRouter.get('/reviews/:id', getReviewsByProduct);
ReviewRouter.post('/reviews', createReview);
ReviewRouter.put('/reviews/:id', updateReview);
ReviewRouter.delete('/reviews/:id', deleteReview);

module.exports = ReviewRouter;