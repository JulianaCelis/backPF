const express = require('express');
const router = express.Router();
const { renewAccessToken, authenticateToken } = require('../middlewares/authMiddleware.js');


router.post('/renew-token', renewAccessToken, (req, res) => {

  res.status(200).json({ newAccessToken: res.locals.newAccessToken });
});

router.post('/verify-token', authenticateToken, (req, res) => {

  res.json({ message: 'Token válido' });
});

module.exports = router;
