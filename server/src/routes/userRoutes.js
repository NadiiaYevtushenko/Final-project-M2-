// usersRoutes.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const { dummyUsers } = require('../controllers/userController');
const {
  getAllUsers,
  getUserById,
  createUser,
  getProfile,
  updateProfile,
  forgotPassword,
  logoutUser,
} = require('../controllers/userController');

const { protect, jwtProtect } = require('../middleware/authMiddleware');
const { generateNextUserId } = require('../utils/idGenerator');

const router = express.Router();

//
// 🔹 SSR (PUG): User listing and detail
//
router.get('/', getAllUsers);
router.get('/:userId', getUserById);

//
// 🔹 SSR (PUG): Auth
//
router.get('/auth/register', (req, res) => {
  res.render('pug/auth/register', { message: null });
});

router.post('/auth/register', (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  if (!firstName || !lastName || !email || !password || password !== confirmPassword) {
    return res.render('pug/auth/register', {
      message: 'Всі поля обовʼязкові або паролі не збігаються',
    });
  }

  if (dummyUsers.find(u => u.email === email)) {
    return res.render('pug/auth/register', {
      message: 'Користувач з таким email вже існує',
    });
  }

  dummyUsers.push({
    id: generateNextUserId(dummyUsers),
    firstName,
    lastName,
    email,
    passwordHash: bcrypt.hashSync(password, 10),
    isAdmin: false,
  });

  res.redirect('/users/auth/login');
});

router.get('/auth/login', (req, res) => {
  res.render('pug/auth/login', { message: null });
});

router.post('/auth/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.render('pug/auth/login', {
        message: info?.message || 'Невірні облікові дані',
      });
    }

    req.logIn(user, (err) => {
      if (err) return next(err);
      res.redirect('/users/auth/protected');
    });
  })(req, res, next);
});

router.get('/auth/protected', protect, (req, res) => {
  res.render('pug/auth/protected', { user: req.user });
});

router.post('/auth/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect('/users/auth/login');
  });
});

//
// 🔹 API (JSON): For SPA/React
//
router.post('/api/register', createUser);

// ✅ JWT-Based Login для SPA
router.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = dummyUsers.find(u => u.email === email);

  if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, isAdmin: user.isAdmin },
    process.env.JWT_SECRET || 'dev-secret',
    { expiresIn: '2h' }
  );

  res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
      firstName: user.firstName,
      lastName: user.lastName,
    }
  });
});

//
// 🔹 Protected API Routes
//
router.get('/api/profile', jwtProtect, getProfile);
router.put('/api/profile', jwtProtect, updateProfile);
router.post('/api/forgot-password', forgotPassword);
router.post('/api/logout', jwtProtect, logoutUser);

module.exports = router;
