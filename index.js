require('dotenv').config();
const express = require('express');
const cors = require('cors');
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

app.use(
  session({
    secret: 'tu_secreto',
    resave: false,
    saveUninitialized: true,
  })
);

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// app.use(cors(corsOptions));

app.use(cors());




app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_REDIRECT_URI,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ where: { googleId: profile.id } });

        if (!user) {
          // Crea un nuevo usuario si no existe
          user = await User.create({
            googleId: profile.id,
            email: profile.emails[0].value,
          });
        }

      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

const authRouter = require('./src/routes/google_router');

app.use('/auth', authRouter);

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ message: 'Unauthorized' });
  } else {
    next(err);
  }
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal Server Error' });
});

sequelizeConnection.sync({ force: false })
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error al sincronizar modelos:', error);
  });