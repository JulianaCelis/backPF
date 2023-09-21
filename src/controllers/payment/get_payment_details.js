const mercadopago = require('mercadopago');

mercadopago.configure({
  access_token: 'TEST-4086619519079692-090811-73f613aa17204f1c1db33b3f4784dd55-70067064',
});
const getPaymentDetails = (req, res) => {
  try {
    const data = req.body;

    if (data && data.id) {
      console.log('Notificación de pago recibida:', data);

      res.status(200).send('OK');
    } else {
      console.error('Notificación de pago inválida:', data);
      res.status(400).send('Invalid notification data');
    }
  } catch (error) {
    console.error('Error al manejar notificación de pago:', error);
    res.status(500).send('Error handling payment notification');
  }
};

module.exports = 
  getPaymentDetails
