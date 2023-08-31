require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());

const server = require('./src/app.js');
const { conn: sequelizeConnection } = require('./src/db.js');
const PORT = process.env.PORT || 3001;

sequelizeConnection.sync({ force: false })
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error al sincronizar modelos:', error);
  });
