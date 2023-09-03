const getProducts = require('./get_products')
const getUsers = require('./get_users')
const createProduct = require('./create_product')
const registerUser = require('./create_user')
const loginUser = require('./login_user')

module.exports = {
    getProducts,
    getUsers,
    createProduct,
    registerUser,
    loginUser
}