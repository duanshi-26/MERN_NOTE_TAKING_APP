const express = require('express');
const { sendNote, getNotes } = require('../controllers/notificationController');
const { protect, admin } = require('../middlewares/authMiddleware');

const router = express.Router();

// Routes
router.post('/', protect, admin, sendNote); 
router.get('/:userId', protect, getNotes);

module.exports = router;
