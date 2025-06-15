const express = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const { dummyUsers } = require('../controllers/userController');
const {
  getAllUsers,
  getUserById,
  createUser,
  loginUser,
  getProfile,
  updateProfile,
  forgotPassword,
  logoutUser,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

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
    id: dummyUsers.length + 1,
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

router.post('/api/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json({ message: info?.message || 'Невірні дані' });
    }

    req.logIn(user, (err) => {
      if (err) return next(err);
      return loginUser(req, res);
    });
  })(req, res, next);
});

router.get('/api/profile', protect, getProfile);
router.put('/api/profile', protect, updateProfile);
router.post('/api/forgot-password', forgotPassword);
router.post('/api/logout', logoutUser);

module.exports = router;
