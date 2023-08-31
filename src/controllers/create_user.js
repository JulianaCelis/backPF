const { User, ShippingAddress } = require('../db');

async function registerUser(req, res) {
  try {
    const { username, email, password, addressData, isSeller, wantsNotification } = req.body;

    if (!addressData || 
        !addressData.addressLine1 || 
        !addressData.addressLine2 || 
        !addressData.city || 
        !addressData.postalCode || 
        !addressData.country) {
      return res.status(400).json({ error: 'Todos los campos de dirección son obligatorios.' });
    }

    // Crear el usuario
    const newUser = await User.create({
      username,
      email,
      password,
      isSeller,
      wantsNotification,
    });

    // Crear la dirección de envío asociada
    const newShippingAddress = await ShippingAddress.create({
      ...addressData,
      userId: newUser.id, // Asociar la dirección con el usuario
    });

    return res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    return res.status(500).json({ error: 'Error al registrar el usuario' });
  }
}

module.exports = {
  registerUser,
};
