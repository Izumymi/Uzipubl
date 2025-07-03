const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Регистрация
router.post('/register', registerUser);

// Авторизация
router.post('/login', loginUser);

// Профиль пользователя (доступен только с токеном)
router.get('/profile', protect, getProfile);

module.exports = router;
