// 🔹 Залежності
const bcrypt = require('bcryptjs');
const { generateToken } = require('../config/jwtUtils');

// 🔹 Тимчасове сховище користувачів
const dummyUsers = [
  { id: 1, firstName: 'Alice', email: 'alice@example.com', passwordHash: bcrypt.hashSync('pass1', 10), isAdmin: false },
  { id: 2, firstName: 'Bob', email: 'bob@example.com', passwordHash: bcrypt.hashSync('pass2', 10), isAdmin: false },
];
let userIdCounter = 3;


// http://localhost:5000/users                // SSR: усі користувачі
// http://localhost:5000/users/1             // SSR: один користувач

// http://localhost:5000/users/api           // JSON API
// http://localhost:5000/users/api/1         // JSON API один користувач
//
// ===================================
// 🔹 SSR (PUG) Маршрути
// ===================================

// 🔍 GET /users — список користувачів (SSR Pug)
const getAllUsers = (req, res) => {
  res.render('pug/users/index.pug', {
    title: 'Users',
    users: dummyUsers.map(({ passwordHash, ...u }) => u), // без хешу
  });
};

// 🔍 GET /users/:userId — один користувач (SSR Pug)
const getUserById = (req, res) => {
  const user = dummyUsers.find(u => u.id === parseInt(req.params.userId));
  if (!user) return res.status(404).send('User not found');
  res.render('pug/users/show.pug', {
    title: 'User Details',
    user: { ...user, passwordHash: undefined },
  });
};

//
// ===================================
// 🔹 API (JSON) Маршрути
// ===================================

// 🟢 POST /api/users/register
const createUser = (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: 'Всі поля обовʼязкові' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Паролі не збігаються' });
  }

  const userExists = dummyUsers.find(u => u.email === email);
  if (userExists) {
    return res.status(409).json({ message: 'Користувач з таким email вже існує' });
  }

  const passwordHash = bcrypt.hashSync(password, 10);
  const newUser = {
    id: userIdCounter++,
    firstName,
    lastName,
    email,
    passwordHash,
    isAdmin: false,
  };

  dummyUsers.push(newUser);

  const token = generateToken({ email, isAdmin: false });

  res.cookie('token', token, {
    httpOnly: true,
    maxAge: 3600000,
    sameSite: 'lax',
    secure: false,
  });

  res.status(201).json({
    message: 'Реєстрація успішна',
    token,
    user: {
      email,
      firstName,
      isAdmin: false,
    },
  });
};

// 🟠 POST /api/users/login
const loginUser = (req, res) => {
  const { email, password } = req.body;

  const user = dummyUsers.find(u => u.email === email);
  if (!user) return res.status(401).json({ message: 'Користувача не знайдено' });

  const passwordMatch = bcrypt.compareSync(password, user.passwordHash);
  if (!passwordMatch) return res.status(401).json({ message: 'Невірний пароль' });

  const token = generateToken({ email: user.email, isAdmin: user.isAdmin });

  res.cookie('token', token, {
    httpOnly: true,
    maxAge: 3600000,
    sameSite: 'lax',
    secure: false,
  });

  res.status(200).json({
    message: 'Login successful',
    user: {
      email: user.email,
      firstName: user.firstName,
      isAdmin: user.isAdmin,
    },
  });
};

// 🔐 GET /api/users/profile
const getProfile = (req, res) => {
  res.json({ user: req.user });
};

// 🔄 PUT /api/users/profile
const updateProfile = (req, res) => {
  res.send(`Профіль користувача ${req.user.email} оновлено`);
};

//
// ===================================
// 🔹 Експорт
// ===================================
module.exports = {
  getAllUsers,       // SSR
  getUserById,       // SSR
  createUser,        // API
  loginUser,         // API
  getProfile,        // API
  updateProfile,     // API
};
