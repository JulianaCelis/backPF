const mercadopago = require('mercadopago');
const Productss = require('../../db'); 
const dotenv = require('dotenv');

dotenv.config(); // Cargar las variables de entorno desde .env

mercadopago.configure({
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN,
});

const PaymentNotification = async (req, res) => {
  try {
    const paymentId = req.query.id;

    const paymentInfo = await mercadopago.payment.get(paymentId);

    if (paymentInfo.body.status === 'approved') {

      const productIdsInOrder = paymentInfo.body.order.order_items.map(item => item.id);

      for (const productId of productIdsInOrder) {
        const product = await Products.findById(productId);

        if (product) {
          product.quantity -= 1;

          await product.save();
        }
      }

      res.sendStatus(200);
    } else {

      res.sendStatus(200);
    }
  } catch (error) {
    console.error('Error al manejar la notificación de pago de MercadoPago:', error);

    res.status(500).json({ error: 'Error al manejar la notificación de pago.' });
  }
};

module.exports = PaymentNotification;

