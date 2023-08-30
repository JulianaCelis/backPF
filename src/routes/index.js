const { Router } = require('express');
const productsRouter = require('./products');
const usersRouter = require('./users');
const ordersRouter = require('./orders');

const router = Router();

// Configurar los routers
router.use('/products', product_router);
// router.use('/users', user_router);
// router.use('/orders', order_router);

router.use((req, res, next) => {
  console.log('Ruta no encontrada:', req.originalUrl);
  res.status(404).json({ error: 'Ruta no encontrada' });
});

module.exports = router;
