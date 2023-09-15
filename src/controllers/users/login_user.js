const { User } = require('../../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const axios = require('axios');

async function loginUser(req, res) {
  try {
    const { email, password, rememberMe, googleCode } = req.body;
   
    if (googleCode) {
      const googleTokenResponse = await exchangeGoogleCodeForToken(googleCode);
      const googleProfile = await fetchGoogleUserProfile(googleTokenResponse.access_token);

      const existingUser = await User.findOne({ where: { googleId: googleProfile.id } });

      if (existingUser) {
        const accessToken = jwt.sign({ userId: existingUser.id }, process.env.SECRET_KEY, { expiresIn: '1h' });
        const refreshToken = jwt.sign({ userId: existingUser.id }, process.env.REFRESH_SECRET_KEY, { expiresIn: '7d' });

        return res.status(200).json({ message: 'Inicio de sesión exitoso', accessToken, refreshToken });
      }
    }

    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const expiresIn = rememberMe ? '7d' : '1h';
    const accessToken = jwt.sign({ userId: user.id, isSeller: user.isSeller }, process.env.SECRET_KEY, { expiresIn });
    const refreshToken = jwt.sign({ userId: user.id }, process.env.REFRESH_SECRET_KEY, { expiresIn: '7d' });

    if (rememberMe) {
      res.cookie('accessToken', accessToken, { maxAge: 604800000, httpOnly: true, secure: true });
    }

    return res.status(200).json({ message: 'Inicio de sesión exitoso', accessToken, refreshToken });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    return res.status(500).json({ error: 'Error al iniciar sesión' });
  }
}

async function exchangeGoogleCodeForToken(googleCode) {
  const googleTokenResponse = await axios.post('https://oauth2.googleapis.com/token', null, {
    params: {
      code: googleCode,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
      grant_type: 'authorization_code',
    },
  });
  return googleTokenResponse.data;
}

async function fetchGoogleUserProfile(accessToken) {
  const googleProfileResponse = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return googleProfileResponse.data;
}

module.exports = loginUser;
