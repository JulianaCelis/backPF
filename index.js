require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser'); 
const app = express();
const server = require('./src/app.js');
const passport = require('./src/handlers/passport');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User } = require('./src/db.js');
const { conn: sequelizeConnection } = require('./src/db.js');
const PORT = process.env.PORT || 3001;

app.use(express.json());


app.use(cookieParser());

// Configura una sesión para Passport
app.use(session({ secret: 'tu_secreto', resave: false, saveUninitialized: true }));

// Inicializa Passport y utiliza sesiones para mantener la autenticación
app.use(passport.initialize());
app.use(passport.session());

// Configura la estrategia de Google
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

// Serializa y deserializa el usuario
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

// ... (otras configuraciones de la aplicación)

// Importa tus rutas de autenticación (por ejemplo, auth_router.js)
const authRouter = require('./src/routes/google_router');

// Usa las rutas de autenticación
app.use('/auth', authRouter);
//fin

sequelizeConnection.sync({ force: false })
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error al sincronizar modelos:', error);
  });
