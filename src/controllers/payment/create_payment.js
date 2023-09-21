const mercadopago = require('mercadopago');

mercadopago.configure({
  access_token: 'TU_ACCESS_TOKEN', // Reemplaza con tu Access Token de MercadoPago
});

exports.createPreference = (req, res) => {
  // Obtén los datos de los items del cuerpo de la solicitud
  const { items } = req.body;

  // Verifica que se hayan proporcionado los datos de los items
  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Datos de los items no proporcionados o inválidos' });
  }

  // Crea la preferencia de pago con los datos de los items proporcionados
  const preference = {
    items: items,
  };

  mercadopago.preferences.create(preference)
    .then((response) => {
      res.json({ preference_id: response.body.id });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Error al crear la preferencia de pago' });
    });
};



