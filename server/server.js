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
const bcrypt = require('bcryptjs');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const isProd = process.env.NODE_ENV === 'production';

// ===== Database =====
const connectDB = require('./src/config/db');
connectDB();

// ===== View Engines =====
app.set('views', path.join(__dirname, 'src/controllers/views'));
app.engine('pug', pug.__express);
app.engine('ejs', ejs.__express);
app.set('view engine', 'pug');

// ===== Middleware =====
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

const logRequests = require('./src/middleware/logRequestsMiddleware');
app.use(logRequests);

// ===== Session & Passport =====
app.use(session({
  name: 'sid',
  secret: process.env.SESSION_SECRET || 'passport-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 2,
  }
}));

app.use(passport.initialize());
app.use(passport.session());

const { dummyUsers } = require('./src/controllers/userController');

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

// ===== Locals =====
app.use((req, res, next) => {
  res.locals.theme = req.cookies.theme || 'light';
  res.locals.year = new Date().getFullYear();
  next();
});

// ===== Static =====
app.use(express.static(path.join(__dirname, 'public')));
app.get('/favicon.ico', (req, res) =>
  res.sendFile(path.join(__dirname, 'public', 'favicon.ico'))
);

// ===== Routes =====
const userRoutes = require('./src/routes/userRoutes');
const emailRoutes = require('./src/routes/emailRoutes');
const themeRoutes = require('./src/routes/themeRoutes');
const productApiRoutes = require('./src/routes/productApiRoutes');
const ssrProductRoutes = require('./src/routes/ssrProductRoutes');

// 🔹 API → JSON
app.use('/api/products', productApiRoutes);

// 🔹 SSR → HTML
app.use('/products', ssrProductRoutes);

// 🔹 Інші
app.use('/users', userRoutes);
app.use('/email', emailRoutes);
app.use('/', themeRoutes);

// Статика для зображень
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// ===== Error handler =====
const errorHandler = require('./src/middleware/errorHandlerMiddleware');
app.use(errorHandler);

// ===== Start =====
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
