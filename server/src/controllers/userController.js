const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const { generateToken } = require('../config/jwtUtils');
const { generateNextUserId } = require('../utils/idGenerator'); 
require('dotenv').config();


// 🔹 Тимчасова база користувачів
const dummyUsers = [
  { id: 1, firstName: 'Alice', email: 'alice@example.com', passwordHash: bcrypt.hashSync('pass1', 10), isAdmin: false },
  { id: 2, firstName: 'Bob', email: 'bob@example.com', passwordHash: bcrypt.hashSync('pass2', 10), isAdmin: false },
  { id: 3, firstName: 'ADMIN', email: 'exemple@gmail.com', passwordHash: bcrypt.hashSync('11111', 10), isAdmin: true },
];
let userIdCounter = 100;

//
// 🔹 SSR — сторінки користувачів
//
const getAllUsers = (req, res) => {
  res.render('pug/users/index.pug', {
    title: 'Users',
    users: dummyUsers.map(({ passwordHash, ...u }) => u),
  });
};

const getUserById = (req, res) => {
  const user = dummyUsers.find(u => u.id === parseInt(req.params.userId));
  if (!user) return res.status(404).send('User not found');
  res.render('pug/users/show.pug', {
    title: 'User Details',
    user: { ...user, passwordHash: undefined },
  });
};

//
// 🔹 API: Реєстрація
//
const createUser = (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;
  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: 'Всі поля обовʼязкові' });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Паролі не збігаються' });
  }
  if (dummyUsers.find(u => u.email === email)) {
    return res.status(409).json({ message: 'Користувач з таким email вже існує' });
  }

  const passwordHash = bcrypt.hashSync(password, 10);
  const newUser = {
    id: generateNextUserId(dummyUsers),
    firstName,
    lastName,
    email,
    passwordHash,
    isAdmin: false,
  };
  dummyUsers.push(newUser);

  res.status(201).json({
    message: 'Реєстрація успішна',
    user: {
      id: newUser.id,
      email,
      firstName,
      isAdmin: false,
    },
  });
};

//
// 🔹 API: Вхід через Passport
//
const loginUser = (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'Користувач не автентифікований' });

  const token = generateToken({
    id: req.user.id,
    email: req.user.email,
    isAdmin: req.user.isAdmin,
  });

  res.cookie('token', token, {
    httpOnly: true,
    maxAge: 60 * 60 * 1000,
    sameSite: 'Lax',
    secure: process.env.NODE_ENV === 'production',
  });

  res.status(200).json({
    message: 'Вхід через Passport успішний',
    user: {
      id: req.user.id,
      email: req.user.email,
      firstName: req.user.firstName,
      isAdmin: req.user.isAdmin,
    },
  });
};

//
// 🔹 API: Відновлення пароля
//
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = dummyUsers.find(u => u.email === email);
  if (!user) return res.status(404).json({ message: 'Користувача з таким email не знайдено' });

  const newPassword = Math.random().toString(36).slice(-8);
  user.passwordHash = bcrypt.hashSync(newPassword, 10);

  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Ваш новий пароль',
      text: `Ваш новий тимчасовий пароль: ${newPassword}`,
    });
    res.json({ message: 'Новий пароль відправлено на пошту' });
  } catch (err) {
    console.error('Mailer error:', err);
    res.status(500).json({ message: 'Помилка надсилання пошти (в розробці)' });
  }
};

//
// 🔹 API: Профіль
//
const getProfile = (req, res) => {
  res.json({ user: req.user });
};

const updateProfile = (req, res) => {
  res.send(`Профіль користувача ${req.user.email} оновлено`);
};

//
// 🔹 API: Вихід
//
const logoutUser = (req, res) => {
  req.logout(() => {
    res.clearCookie('token');
    res.json({ message: 'Вихід успішний' });
  });
};

module.exports = {
  dummyUsers,
  getAllUsers,
  getUserById,
  createUser,
  loginUser,
  forgotPassword,
  getProfile,
  updateProfile,
  logoutUser,
};
