const mercadopago = require('mercadopago');

mercadopago.configure({
  access_token: 'TEST-4086619519079692-090811-73f613aa17204f1c1db33b3f4784dd55-70067064',
});

const createPayment = async (items, returnUrl, userId) => {
  try {
    const preference = {
      items: items.map((item) => ({
        title: item.name,
        unit_price: item.price,
        quantity: item.quantity,
      })),
      external_reference: userId,
      back_urls: {
        success: returnUrl,
        failure: returnUrl,
        pending: returnUrl,
      },
    };

    const response = await mercadopago.preferences.create(preference);
    const initPoint = response.body.init_point;

    return initPoint;
  } catch (error) {
    console.error('Error al crear el pago con MercadoPago:', error);
    throw error;
  }
};

module.exports = createPayment