const { User } = require('../db.js');

async function getUser(req, res) {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la lista de usuarios' });
  }
}


module.exports = {
  getUser,
};
