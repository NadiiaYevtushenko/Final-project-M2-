const express = require('express');
const {
  getAllUsers,
  getUserById,
  createUser,
  loginUser,
  getProfile,
  updateProfile,
} = require('../controllers/userController');

const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// 🔹 SSR (PUG)
router.get('/', getAllUsers); 
router.get('/:userId', getUserById);  

// 🔹 API
router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);

module.exports = router;