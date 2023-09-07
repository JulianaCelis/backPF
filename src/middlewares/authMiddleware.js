const jwt = require('jsonwebtoken');
require('dotenv').config();

function authenticateToken(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Acceso no autorizado' });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token no válido' });
    }

    // Verifica la condición isSeller antes de permitir el acceso
    if (!user.isSeller) {
      return res.status(403).json({ error: 'No tienes permiso para acceder a esta ruta' });
    }

    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
