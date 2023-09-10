const mercadopago = require('mercadopago');

// Configura las credenciales de MercadoPago
mercadopago.configure({
  access_token: 'TEST-4086619519079692-090811-73f613aa17204f1c1db33b3f4784dd55-70067064',
});

const getPaymentDetails = async (req, res) => {
  try {
    const paymentId = req.params.paymentId;

    // Consulta los detalles del pago directamente desde MercadoPago
    const paymentDetails = await mercadopago.payment.get(paymentId);

    // Devuelve los detalles del pago como respuesta
    res.status(200).json(paymentDetails);
  } catch (error) {
    console.error('Error al obtener detalles del pago desde MercadoPago:', error);
    res.status(500).json({ error: 'Error al obtener detalles del pago.' });
  }
};

module.exports = 
  getPaymentDetails
