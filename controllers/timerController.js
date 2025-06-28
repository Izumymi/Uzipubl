const Timer = require('../models/timerModel');

// Старт
const startTimer = async (req, res) => {
  const { taskId } = req.params;
  const userId = req.user._id;

  const newTimer = await Timer.create({
    task: taskId,
    user: userId,
    startTime: new Date(),
  });

  res.status(201).json(newTimer);
};

// Стоп
const stopTimer = async (req, res) => {
  const { taskId } = req.params;
  const userId = req.user._id;

  const timer = await Timer.findOne({ task: taskId, user: userId, endTime: null });
  if (!timer) return res.status(404).json({ message: 'Нет активного таймера' });

  timer.endTime = new Date();
  timer.duration = Math.floor((timer.endTime - timer.startTime) / 1000); // в секундах
  await timer.save();

  res.json(timer);
};

module.exports = { startTimer, stopTimer };
