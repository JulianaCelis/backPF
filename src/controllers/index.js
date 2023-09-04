const getProducts = require('./get_products')
const getUsers = require('./get_users')
const createProduct = require('./create_product')
const getAllReviews = require('./get_all_reviews');
const getReviewsByProduct = require('./get_reviews_by_product');
const createReview = require('./create_review');
const updateReview = require('./update_review');
const deleteReview = require('./delete_review');

// Exportar los controladores de reseñas

module.exports = {
    getProducts,
    getUsers,
    createProduct,
    getAllReviews,
    getReviewsByProduct,
    createReview,
    updateReview,
    deleteReview,
}