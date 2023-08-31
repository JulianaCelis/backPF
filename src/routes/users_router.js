const express = require('express');
const router = express.Router();
const { getUsers, registerUser } = require('./controllers/index');

userRouter.get('/', getUsers);

userRouter.post('/register', registerUser);

module.exports = router;
