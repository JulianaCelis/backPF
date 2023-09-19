const express = require('express');
const router = express.Router();
const { renewAccessToken } = require('../middlewares/authMiddleware.js');


router.post('/renew-token', renewAccessToken, (req, res) => {

  res.status(200).json({ newAccessToken: res.locals.newAccessToken });
});

module.exports = router;
