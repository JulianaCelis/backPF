const { User, ShippingAddress } = require('../../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sgMail = require('../sendgridConfig'); 
require('dotenv').config();

async function registerUser(req, res) {
  try {
    const { 
      username, 
      email, 
      firstName, 
      lastName, 
      birthdate,
      password, 
      addressData,
      isSeller, 
      wantsNotification, 
      storeName, 
      googleProfile,
      isAdmin
     } = req.body;

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
      firstName, 
      lastName, 
      birthdate,
      password: hashedPassword, 
      isSeller,
      wantsNotification,
      storeName: isSeller ? storeName : null,
      isAdmin: isAdmin || false,
    });

    const tokenPayload = {
      userId: newUser.id,
      isSeller,
      isAdmin: isAdmin || false,
    };

    if (googleProfile) {
      tokenPayload.googleProfile = googleProfile;
    }

    const token = jwt.sign(
      tokenPayload,
      process.env.SECRET_KEY,
      { expiresIn: '1h' }
    );

    const newShippingAddress = await ShippingAddress.create({
      addressLine1: addressData.addressLine1,
      addressLine2: addressData.addressLine2,
      city: addressData.city,
      postalCode: addressData.postalCode,
      country: addressData.country,
      userId: newUser.id, 
    });

    const msg = {
      to: email, 
      from: 'grtechpf@gmail.com', 
      subject: 'Bienvenido a GRTECH',
      text: '¡Gracias por unirte a nuestra aplicación!',
      html: '<strong>¡Gracias por unirte a nuestra aplicación!</strong>',
    };

    sgMail.send(msg)
      .then(() => console.log('Correo electrónico de bienvenida enviado'))
      .catch((error) => console.error('Error al enviar el correo electrónico de bienvenida', error));



    return res.status(201).json({ message: 'Usuario registrado exitosamente', token });
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    return res.status(500).json({ error: 'Error al registrar el usuario' });
  }
}

module.exports = registerUser;

