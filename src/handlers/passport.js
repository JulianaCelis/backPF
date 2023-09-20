const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User } = require('../db');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_REDIRECT_URI,
    },
    async (accessToken, refreshToken, profile, done) => {
      // Implementa la lógica para encontrar o crear un usuario en tu base de datos
      try {
        let user = await User.findOne({ where: { googleId: profile.id } });

        if (!user) {
          // Crea un nuevo usuario si no existe
          user = await User.create({
            googleId: profile.id,
            email: profile.emails[0].value,
            // Otros campos de usuario según lo necesario
          });
        }

        // Llama a done() con el usuario para autenticación exitosa
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  // Implementa la serialización de usuario según tus necesidades
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  // Implementa la deserialización de usuario según tus necesidades
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;