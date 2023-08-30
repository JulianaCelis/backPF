const User = require('../models/User');

async function getUsers(req, res) {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la lista de usuarios' });
  }
}


module.exports = {
  getUsers,
};
