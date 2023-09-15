const jwt = require('jsonwebtoken');
const jwtSecret = process.env.SECRET_KEY;
const refreshSecretKey = process.env.REFRESH_SECRET_KEY; // Agregamos esta línea

// Middleware para renovar el token de acceso si es necesario
function renewAccessToken(req, res, next) {
  // Obtén el token de refresco del cuerpo de la solicitud
  const refreshToken = req.body.refreshToken;
  const rememberMe = req.body.rememberMe; // Agrega esta línea para obtener rememberMe desde el cuerpo

  if (!refreshToken) {
    return res.status(401).json({ error: 'Token de refresco no proporcionado' });
  }

  jwt.verify(refreshToken, refreshSecretKey, (err, decodedToken) => {
    if (err) {
      console.error('Error al verificar el token de refresco:', err);
      return res.status(403).json({ error: 'Token de refresco no válido' });
    }

    // Define la duración del nuevo token de acceso
    const expiresIn = rememberMe ? '7d' : '1h'; // Duración extendida si rememberMe es true

    // Genera un nuevo token de acceso con la duración correspondiente
    const newAccessToken = jwt.sign({ userId: decodedToken.userId }, jwtSecret, { expiresIn });

    // Agrega el nuevo token de acceso a la respuesta
    res.locals.newAccessToken = newAccessToken;
    next();
  });
}

// Middleware de autenticación que verifica el token de acceso
function authenticateToken(req, res, next) {
  // Obtén el token de autorización del encabezado
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

    // Si el token de acceso es válido, pasa al siguiente middleware
    req.user = {
      id: decodedToken.userId,
    };

    next();
  });
}

module.exports = { renewAccessToken, authenticateToken };
