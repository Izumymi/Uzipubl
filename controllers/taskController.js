const Task = require('../models/taskModel');

// Создать задачу
const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Название задачи обязательно' });
    }

    const task = await Task.create({
      title,
      description,
      user: req.user._id,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при создании задачи' });
  }
};

// Получить все задачи пользователя
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении задач' });
  }
};

// Обновить задачу
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const task = await Task.findOne({ _id: id, user: req.user._id });
    if (!task) {
      return res.status(404).json({ message: 'Задача не найдена' });
    }

    task.title = title || task.title;
    task.description = description || task.description;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при обновлении задачи' });
  }
};

// Удалить задачу
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findOneAndDelete({ _id: id, user: req.user._id });
    if (!task) {
      return res.status(404).json({ message: 'Задача не найдена' });
    }

    res.json({ message: 'Задача удалена' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при удалении задачи' });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};
