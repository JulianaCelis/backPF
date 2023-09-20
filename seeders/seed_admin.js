'use strict';
const bcrypt = require('bcrypt');
const { conn, User } = require('../src/db');


module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      // Crear el usuario administrador
      const adminUser = await User.create({
        username: 'Admin',
        email: 'admin@email.com',
        firstName: 'Nombre',
        lastName: 'Apellido',
        birthdate: '1990-01-01',
        password: await bcrypt.hash('contrasena_secreta', 10),
        wantsNotifications: true,
        isSeller: true,
        storeName: 'Admisn',
        isAdmin: true, // Este campo se establece como administrador
      });

      console.log('Usuario administrador creado con éxito.');
    } catch (error) {
      console.error('Error al crear el usuario administrador:', error);
    }
  },

  down: async (queryInterface, Sequelize) => {
  },
};

