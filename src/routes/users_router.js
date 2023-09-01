const express = require('express');
const userRouter = express.Router();
const { getUsers, registerUser, loginUser } = require('../controllers/index');

userRouter.get('/', async (req, res) => {
    try {
      const users = await getUsers(); 
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener la lista de usuarios' });
    }
  });
  

userRouter.post('/register', registerUser);

userRouter.post('/login', loginUser);

module.exports = userRouter;
