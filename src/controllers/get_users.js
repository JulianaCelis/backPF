const { User, ShippingAddress } = require('../db.js');

async function getUsers() {
  try {
    const users = await User.findAll({
      include: {
        model: ShippingAddress,
        as: 'shippingAddresses', // Asegúrate de que coincida con el alias definido en las asociaciones
        required: false, // Esto permite que los usuarios sin direcciones de envío también se incluyan
      },
    });
    return users;
  } catch (error) {
    throw new Error('Error al obtener la lista de usuarios');
  }
}

module.exports = getUsers;
