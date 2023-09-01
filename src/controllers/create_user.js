const { User, ShippingAddress } = require('../db');
const bcrypt = require('bcrypt');

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

    const hashedPassword = await bcrypt.hash(password, 10);

    const newShippingAddress = await ShippingAddress.create({
      addressLine1: addressData.addressLine1,
      addressLine2: addressData.addressLine2,
      city: addressData.city,
      postalCode: addressData.postalCode,
      country: addressData.country,
    });

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword, 
      isSeller,
      wantsNotification,
    });

    await newUser.addShippingAddresses(newShippingAddress);

    return res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    return res.status(500).json({ error: 'Error al registrar el usuario' });
  }
}

module.exports = registerUser;
