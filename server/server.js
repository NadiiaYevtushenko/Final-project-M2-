const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const dotenv = require('dotenv');
const pug = require('pug');
const ejs = require('ejs');

const logRequests = require('./src/middleware/logRequestsMiddleware');
const userRoutes = require('./src/routes/userRoutes');
const productRoutes = require('./src/routes/productRoutes');
const themeRoutes = require('./src/routes/themeRoutes');
const { dummyUsers } = require('./src/controllers/userController');
const bcrypt = require('bcryptjs');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const isProd = process.env.NODE_ENV === 'production';

//
// ==============================
// 🔹 View Engines
// ==============================
app.set('views', path.join(__dirname, 'src/controllers/views'));
app.engine('pug', pug.__express);
app.engine('ejs', ejs.__express);
app.set('view engine', 'pug'); // Default — pug

//
// ==============================
// 🔹 Middleware
// ==============================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(logRequests);

app.use(session({
  name: 'sid',
  secret: process.env.SESSION_SECRET || 'passport-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: isProd,               // HTTPS only in production
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 2,   // 2 hours
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.theme = req.cookies.theme || 'light';
  res.locals.year = new Date().getFullYear();
  next();
});

//
// ==============================
// 🔒 Passport конфігурація
// ==============================
passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
  const user = dummyUsers.find(u => u.email === email);
  if (!user) return done(null, false, { message: 'Користувача не знайдено' });
  if (!bcrypt.compareSync(password, user.passwordHash)) return done(null, false, { message: 'Невірний пароль' });
  return done(null, user);
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  const user = dummyUsers.find(u => u.id === Number(id));
  if (!user) return done(null, false);
  done(null, user);
});

//
// ==============================
// 🔹 Static & Theme
// ==============================
app.use(express.static(path.join(__dirname, 'public')));
app.get('/favicon.ico', (req, res) =>
  res.sendFile(path.join(__dirname, 'public', 'favicon.ico'))
);
app.use('/', themeRoutes);

//
// ==============================
// 🔹 Routes
// ==============================
app.use('/api/products', productRoutes);
app.use('/products', productRoutes); // SSR
app.use('/users', userRoutes);       // SSR + API (/users/api/*)

//
// ==============================
// 🔹 Start
// ==============================
app.listen(PORT, () => {
  console.log(`✅ Server started at http://localhost:${PORT}`);
});
