const express = require('express');
const paymentRouter = express.Router();
const {createPayment,paymentNotification,getPaymentDetails} = require('../controllers/index');

paymentRouter.post('/', createPayment);
paymentRouter.post('/notification', paymentNotification);
paymentRouter.get('/:paymentId', getPaymentDetails);


module.exports = paymentRouter