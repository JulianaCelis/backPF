const express = require('express');
const userRouter = express.Router();
const { getUsers, registerUser, loginUser, getUserById} = require('../controllers/index');
const { authenticateToken } = require('../middlewares/authMiddleware.js');

userRouter.get('/', async (req, res) => {
    try {
      const users = await getUsers(); 
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener la lista de usuarios' });
    }
  });
  
  userRouter.get('/:userId', async (req, res) => {
    const userId = req.params.userId; 
  
    try {

      const user = await getUserById(userId);
      res.status(200).json(user);
    } catch (error) {
      console.error('Error al obtener el usuario:', error);
      res.status(500).json({ error: 'Error al obtener el usuario' });
    }
  });
  

userRouter.post('/register', registerUser);

userRouter.post('/login', loginUser);

module.exports = userRouter;
