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
const AddRating = require('./add_rating');
const getCart = require('./cartController/get_cart');
const getUserCart = require('./cartController/get_cart');
const getTempCartFromSession = require('./cartController/get_cart');
const addToCart = require('./cartController/cart_add');
const addToTempCart = require('./cartTempController/cart_temp_add');
const removeFromCart = require('./cartController/cart_remove');
const removeFromTempCart = require('./cartTempController/cart_temp_remove');
const checkout = require('./checkout');
const createPayment = require('./payment/create_payment');
const paymentNotification = require('./payment/payment_notification');
const getPaymentDetails = require('./payment/get_payment_details');

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
    AddRating,
    getCart,
    getUserCart,
    getTempCartFromSession,
    addToCart,
    addToTempCart,
    removeFromCart,
    removeFromTempCart,
    checkout,
    createPayment,
    paymentNotification,
    getPaymentDetails
}