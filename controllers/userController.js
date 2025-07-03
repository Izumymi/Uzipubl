const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Регистрация пользователя
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Пользователь уже существует' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Ошибка регистрации' });
  }
};

// Вход пользователя
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Неверный email или пароль' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Неверный email или пароль' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Ошибка входа' });
  }
};

// 🔒 Получение профиля
const getProfile = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при получении профиля' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getProfile,
};
