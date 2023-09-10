const jwt = require('jsonwebtoken');
const jwtSecret = process.env.SECRET_KEY;

function authenticateToken(req, res, next) {
  // Obtén el token de autorización del encabezado
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; 

  if (!token) {
    return res.status(401).json({ error: 'Token de autorización no proporcionado' });
  }

  jwt.verify(token, jwtSecret, (err, decodedToken) => {
    if (err) {
      console.error('Error al verificar el token:', err); 
      return res.status(403).json({ error: 'Token de autorización no válido' });
    }
    console.log('Contenido del token decodificado:', decodedToken);
    if (!decodedToken.isSeller) {
      return res.status(403).json({ error: 'Acceso no autorizado para no vendedores' });
    }

    console.log('Contenido del token decodificado:', decodedToken);

    req.user = {
      id: decodedToken.userId,
    };
    
    next();
  });
}

module.exports = authenticateToken;
