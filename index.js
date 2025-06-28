const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config(); // Загружаем .env
connectDB();     // Подключение к MongoDB

const app = express(); // Сначала создаём app!

app.use(cors());
app.use(express.json()); // Для работы с JSON

// Роуты
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes')); // теперь OK

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
