const { User, ShippingAddress } = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

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

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ error: 'El usuario con este correo electrónico ya existe.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword, 
      isSeller,
      wantsNotification,
    });

    const token = jwt.sign({ userId: newUser.id }, process.env.SECRET_KEY, { expiresIn: '1h' });

    const newShippingAddress = await ShippingAddress.create({
      addressLine1: addressData.addressLine1,
      addressLine2: addressData.addressLine2,
      city: addressData.city,
      postalCode: addressData.postalCode,
      country: addressData.country,
      userId: newUser.id, 
    });

    return res.status(201).json({ message: 'Usuario registrado exitosamente', token });
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    return res.status(500).json({ error: 'Error al registrar el usuario' });
  }
}

module.exports = registerUser;
