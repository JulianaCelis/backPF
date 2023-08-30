require('dotenv').config();
const express = require('express');
const sequelize = require('./sequelize');
const productsRouter = require('./routes/product_router');

const app = express();

sequelize.sync().then(() => {
  console.log('Conexión a la base de datos establecida');
}).catch((error) => {
  console.error('Error en la conexión a la base de datos:', error);
});

app.use('/api', productsRouter);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});
