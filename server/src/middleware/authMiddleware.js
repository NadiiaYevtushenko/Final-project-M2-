const { verifyToken } = require('../config/jwtUtils');

const protect = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: 'Неавторизований доступ' });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Невалідний токен' });
  }
};

module.exports = { protect };
