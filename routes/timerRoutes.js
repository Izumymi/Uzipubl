const express = require('express');
const router = express.Router();
const { startTimer, stopTimer } = require('../controllers/timerController');
const { protect } = require('../middleware/authMiddleware');

router.post('/start/:taskId', protect, startTimer);
router.post('/stop/:taskId', protect, stopTimer);

module.exports = router;
