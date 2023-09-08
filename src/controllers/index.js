const createProduct = require('./create_product')
const getProducts = require('./get_products')
const getProductById = require('./get_product_by_id')
const updateProduct = require('./update_product')
const registerUser = require('./create_user')
const getUsers = require('./get_users')
const loginUser = require('./login_user')
const getAllReviews = require('./get_all_reviews');
const getReviewsByProduct = require('./get_reviews_by_product');
const createReview = require('./create_review');
const updateReview = require('./update_review');
const deleteReview = require('./delete_review');

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    getUsers,
    registerUser,
    loginUser,
    getAllReviews,
    getReviewsByProduct,
    createReview,
    updateReview,
    deleteReview,
}