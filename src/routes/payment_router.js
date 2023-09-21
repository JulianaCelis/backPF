const mercadopago = require('mercadopago');
require('dotenv').config(); 
const express = require('express');
const paymentRouter = express.Router();
const {paymentNotification,getPaymentDetails} = require('../controllers/index');
const mercadopagoController = require('../controllers/payment/create_payment');


const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;

paymentRouter.post('/', mercadopagoController.createPreference);
paymentRouter.post('/notification', paymentNotification);
paymentRouter.get('/:paymentId', getPaymentDetails);


module.exports = paymentRouter