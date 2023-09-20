const { Router } = require('express');
const product_router = require('./product_router');
const users_router = require('./users_router');
// const orderRouter = require('./orders_router');
const category_router = require('./category_router');
const review_router = require('./review_router');
const cart_router = require('./cart_router');
const cart_temp_router = require('./cart_temp_router');
const payment_router = require('./payment_router');
const google_router = require('./google_router');
const tokens_router = require('./tokens_router');
const softdelete_router = require('./soft_delete_router');
const router = Router();

// Configurar los enrutadores
router.use('/products', product_router);
router.use('/users', users_router);
// router.use('/orders', order_router);
router.use('/category', category_router);
router.use('/reviews', review_router);
router.use('/cart', cart_router);
router.use('/cart_temp', cart_temp_router);
router.use('/payment', payment_router);
router.use('/auth/google', google_router)
router.use('', tokens_router);
router.use('/softdelete', softdelete_router);

router.use((req, res, next) => {
  console.log('Ruta no encontrada:', req.originalUrl);
  res.status(404).json({ error: 'Ruta no encontrada' });
});

module.exports = router;
