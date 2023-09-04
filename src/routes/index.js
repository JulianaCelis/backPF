const { Router } = require('express');
const product_router = require('./product_router');
const review_router = require('./review_router');
// const userRouter = require('./users_router');
// const orderRouter = require('./orders_router');

const router = Router();

// Configurar los routers
router.use('/products', product_router);
router.use('/reviews', review_router);
// router.use('/users', user_router);
// router.use('/orders', order_router);

router.use((req, res, next) => {
  console.log('Ruta no encontrada:', req.originalUrl);
  res.status(404).json({ error: 'Ruta no encontrada' });
});

module.exports = router;
