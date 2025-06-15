const { verifyToken } = require('../config/jwtUtils');

// 🔹 Middleware для перевірки JWT токена (для React API)
const jwtProtect = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: 'Неавторизований доступ' });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Недійсний або протермінований токен' });
  }
};

// 🔹 Middleware для перевірки Passport-сесії (для SSR/PUG)
const protect = (req, res, next) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }

  // SSR route → redirect
  if (req.accepts(['html', 'json']) === 'html') {
    return res.redirect('/users/auth/login');
  }

  // API route → JSON
  return res.status(401).json({ message: 'Неавторизований доступ' });
};

module.exports = {
  protect,       // для SSR через session
  jwtProtect,    // для SPA через JWT
};
