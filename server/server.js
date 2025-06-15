const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

// 🔹 Шаблонізатори
const pug = require('pug');
const ejs = require('ejs');

// 🔹 Middleware
const logRequests = require('../server/src/middleware/logRequestsMiddleware');

// 🔹 Маршрути
const userRoutes = require('../server/src/routes/userRoutes');
const productRoutes = require('../server/src/routes/productRoutes');  

// 🔹 Завантаження змінних середовища
dotenv.config();

// 🔹 Ініціалізація додатку
const app = express();
const PORT = process.env.PORT || 5000;

//
// ==============================
// 🔹 View Engines
// ==============================
app.set('views', path.join(__dirname, 'src/controllers/views'));

// PUG для /users
app.engine('pug', pug.__express);

// EJS для /products
app.engine('ejs', ejs.__express);

// ❗ Без app.set('view engine') — бо у нас дві системи шаблонів
//
// ==============================
// 🔹 Глобальні middleware
// ==============================
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(logRequests);

//
// ==============================
// 🔹 Статичні файли
// ==============================
app.use(express.static(path.join(__dirname, 'public')));

app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.join(__dirname, '../server/public/favicon.ico'));
});


//
// ==============================
// 🔹 API маршрути
// ==============================
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes); // якщо продукт-роути є

//
// SSR-маршрути (EJS-представлення)
app.use('/products', productRoutes);

// SSR-маршрути (PUG-представлення)
app.use('/users', userRoutes);
// ==============================
// 🔹 Запуск сервера
// ==============================
app.listen(PORT, () => {
  console.log(`✅ Server started at http://localhost:${PORT}`);
});