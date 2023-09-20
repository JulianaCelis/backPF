const jwt = require('jsonwebtoken');
const jwtSecret = process.env.SECRET_KEY;
const refreshSecretKey = process.env.REFRESH_SECRET_KEY; 

function renewAccessToken(req, res, next) {
  const refreshToken = req.body.refreshToken;
  const rememberMe = req.body.rememberMe; 

  if (!refreshToken) {
    return res.status(401).json({ error: 'Token de refresco no proporcionado' });
  }

  jwt.verify(refreshToken, refreshSecretKey, (err, decodedToken) => {
    if (err) {
      console.error('Error al verificar el token de refresco:', err);
      return res.status(403).json({ error: 'Token de refresco no válido' });
    }

    const expiresIn = rememberMe ? '7d' : '1h'; 

    const newAccessToken = jwt.sign({ userId: decodedToken.userId }, jwtSecret, { expiresIn });

    res.locals.newAccessToken = newAccessToken;
    next();
  });
}

function authenticateToken(req, res, next) {

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token de autorización no proporcionado' });
  }

  jwt.verify(token, jwtSecret, (err, decodedToken) => {
    if (err) {
      console.error('Error al verificar el token de acceso:', err);
      return res.status(403).json({ error: 'Token de autorización no válido' });
    }

    req.user = {
      id: decodedToken.userId,
    };

    next();
  });
}

function isAdmin(req, res, next) {
  const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token de autorización no proporcionado' });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
    if (err) {
      console.error('Error al verificar el token de acceso:', err);
      return res.status(403).json({ error: 'Token de autorización no válido' });
    }

    if (!decodedToken.isAdmin) {
      return res.status(403).json({ error: 'Acceso no autorizado para usuarios no administradores' });
    }

    next();
  });
}


module.exports = { renewAccessToken, authenticateToken, isAdmin};
