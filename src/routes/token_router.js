const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { User } = require('../db');

router.post('/refresh-token', async (req, res) => {
  try {
    const { refreshToken } = req.body;


    jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY, async (err, decodedToken) => {
      if (err) {
        return res.status(403).json({ error: 'Token de actualización no válido' });
      }

      const user = await User.findByPk(decodedToken.userId);

      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      const accessToken = jwt.sign({ userId: user.id, isSeller: user.isSeller }, process.env.SECRET_KEY, {
        expiresIn: '1h', // Define la duración del nuevo token de acceso
      });

      return res.status(200).json({ accessToken });
    });
  } catch (error) {
    console.error('Error al renovar el token de acceso:', error);
    return res.status(500).json({ error: 'Error al renovar el token de acceso' });
  }
});

module.exports = router;
