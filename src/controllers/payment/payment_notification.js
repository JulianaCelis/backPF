const mercadopago = require('mercadopago');

mercadopago.configure({
  access_token: 'TEST-4086619519079692-090811-73f613aa17204f1c1db33b3f4784dd55-70067064',
});

const PaymentNotification = async (req, res) => {
  try {
   
    const paymentId = req.query.id;

    const paymentInfo = await mercadopago.payment.get(paymentId);

    if (paymentInfo.body.status === 'approved') {
      // El pago fue aprobado, actualiza el estado del pedido en tu sistema
      // ...

     
      res.sendStatus(200);
    } else {
      // El pago no fue aprobado, toma acciones según tu lógica de negocio
      // ...

      // Envía una respuesta exitosa a MercadoPago para confirmar la recepción de la notificación
      res.sendStatus(200);
    }
  } catch (error) {
    console.error('Error al manejar la notificación de pago de MercadoPago:', error);

    res.status(500).json({ error: 'Error al manejar la notificación de pago.' });
  }
};

module.exports = PaymentNotification
