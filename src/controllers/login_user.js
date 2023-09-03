const { User } = require('../db');
const bcrypt = require('bcrypt');

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    // Buscar al usuario por su correo electrónico
    const user = await User.findOne({
      where: {
        email,
      },
    });

    // Si el usuario no existe, retornar un error
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Verificar la contraseña
    const passwordMatch = await bcrypt.compare(password, user.password);

    // Si la contraseña no coincide, retornar un error
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Usuario autenticado con éxito
    return res.status(200).json({ message: 'Inicio de sesión exitoso' });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    return res.status(500).json({ error: 'Error al iniciar sesión' });
  }
}

module.exports = loginUser;
