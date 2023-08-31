const { User } = require('../db.js');

async function getUsers() {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    return { error: 'Error al obtener la lista de usuarios' };
  }
}

module.exports = getUsers;