const { User } = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config(); 

async function loginUser(req, res) {
  try {
    const { email, password, rememberMe } = req.body;

    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const expiresIn = rememberMe ? '7d' : '1h'; 
    const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, { expiresIn });


    if (rememberMe) {
      res.cookie('accessToken', token, { maxAge: 604800000, httpOnly: true, secure: true }); 
    }

    return res.status(200).json({ message: 'Inicio de sesión exitoso', token });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    return res.status(500).json({ error: 'Error al iniciar sesión' });
  }
}

module.exports = loginUser;
