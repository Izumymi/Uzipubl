const generateToken = require('../utils/generateToken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

// Регистрация
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Все поля обязательны' });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'Пользователь уже существует' });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  res.status(201).json({
    message: 'Пользователь создан успешно',
    user: newUser,
    token: generateToken(newUser._id),
  });
};

// Вход
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email и пароль обязательны' });
  }

  const user = await User.findOne({ email });
  const isMatch = await bcrypt.compare(password, user?.password || '');

  if (!user || !isMatch) {
    return res.status(401).json({ message: 'Неверный email или пароль' });
  }

  res.status(200).json({
    message: 'Вход выполнен успешно',
    user,
    token: generateToken(user._id),
  });
};

module.exports = {
  registerUser,
  loginUser,
};
