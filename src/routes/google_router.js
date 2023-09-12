const express = require('express');
const passport = require('passport');
const googleRouter = express.Router();


googleRouter.get('/', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Ruta de redireccionamiento después de la autenticación de Google
googleRouter.get('/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('/dashboard'); 
});

module.exports = googleRouter;
