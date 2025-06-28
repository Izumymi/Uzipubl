const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');

// Роут для регистрации
router.post('/register', registerUser);

// Роут для входа
router.post('/login', loginUser);

module.exports = router;
