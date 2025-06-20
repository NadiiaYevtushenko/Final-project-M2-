# 🛡️ Розширення функціональності сервера Express з MongoDB Atlas

📘 Опис проєкту
Повноцінний сервер на Express.js з реалізацією:
🔁 SSR (Server-Side Rendering) через Pug та EJS
🔐 Авторизації через Passport.js (локальна стратегія)
🍪 Сесій та cookies для збереження стану користувача
🌗 Перемикання теми (light/dark) через cookie + middleware
🌍 Підтримки CORS (доступ з frontend на localhost:3000)
📂 Модульної структури маршрутів та контролерів
🧱 Підключення до MongoDB Atlas (через Mongoose)
📥 REST API для CRUD-операцій над товарами
⚠️ Дані користувачів зберігаються в оперативній памʼяті (масив), тому після перезапуску сервера всі користувачі видаляються.

## ✅ Нове у цій версії

Цей реліз розширює серверну функціональність проєкту Express.js з MongoDB Atlas:

🔧 CRUD-операції (через REST API /api/products/)
POST /api/products — додати один продукт (insertOne)
POST /api/products/bulk — додати масив продуктів (insertMany)
PATCH /api/products/:id — оновити один продукт (updateOne)
PATCH /api/products/bulk — оновити кілька продуктів (updateMany)
PUT /api/products/:id — повністю замінити продукт (replaceOne)
DELETE /api/products/:id — видалити один продукт (deleteOne)
DELETE /api/products/bulk — видалити кілька продуктів (deleteMany)
GET /api/products?fields=name,price — пошук з підтримкою проєкції (find with projection)

### 📦 Технології

- Node.js + Express (5.x)
- Passport (локальна стратегія) (реалізовано через server.js)
- Сесії через express-session
- Шаблонізатори: Pug (автентифікація, профілі) та EJS (товари ( в розробці))
- CORS + cookie-parser
- JWT utility (використовується для API-запитів)
- Nodemailer (відновлення пароля)
- Тема сайту: світла / темна (через cookie)
- MongoDB Atlas + Mongoose
- Mongoose ODM (Object Document Mapper)

## 📁 Структура проєкту

````
server/
├── .env
├── package.json
├── package-lock.json
├── README.md
├── server.js
├── public/
│   ├── favicon.ico
│   ├── style.css
│   ├── images/
│   │   └── picLogo.png
│   ├── scripts/
│   │   └── theme.js
│   ├── uploads/
│   │   ├── fdm.jpg
│   │   ├── placeholder.png
│   │   └── sla.jpg
├── src/
│   ├── config/
│   │   ├── db.js
│   │   └── jwtUtils.js
│   ├── controllers/
│   │   ├── emailController.js
│   │   ├── productController.js
│   │   ├── userController.js
│   │   ├── products/
│   │   │   ├── deleteMany.js
│   │   │   ├── deleteOne.js
│   │   │   ├── findWithProjection.js
│   │   │   ├── insertMany.js
│   │   │   ├── insertOne.js
│   │   │   ├── renderAllProducts.js
│   │   │   ├── renderAllProductsFromDB.js
│   │   │   ├── renderCategoryList.js
│   │   │   ├── renderProductBySlug.js
│   │   │   ├── renderProductsByCategory.js
│   │   │   ├── replaceOne.js
│   │   │   ├── updateMany.js
│   │   │   └── updateOne.js
│   │   └── views/
│   │       ├── ejs/
│   │       │   ├── partials/
│   │       │   │   ├── footer.ejs
│   │       │   │   └── header.ejs
│   │       │   └── products/
│   │       │       ├── categories.ejs
│   │       │       ├── category.ejs
│   │       │       ├── index.ejs
│   │       │       └── show.ejs
│   │       └── pug/
│   │           ├── auth/
│   │           │   ├── login.pug
│   │           │   ├── protected.pug
│   │           │   └── register.pug
│   │           ├── layouts/
│   │           │   └── base.pug
│   │           └── users/
│   │               ├── index.pug
│   │               └── show.pug
│
│   ├── middleware/
│   │   ├── adminMiddleware.js
│   │   ├── authMiddleware.js
│   │   ├── errorHandlerMiddleware.js
│   │   ├── logRequestsMiddleware.js
│   │   └── validationUserInput.js
│
│   ├── models/
│   │   └── Product.js
│
│   ├── routes/
│   │   ├── emailRoutes.js
│   │   ├── productApiRoutes.js
│   │   ├── productRoutes.js
│   │   ├── ssrProductRoutes.js
│   │   ├── themeRoutes.js
│   │   └── userRoutes.js
│
│   └── utils/
│       ├── idGenerator.js
│       ├── mailer.js
│       └── slugify.js
```


## 🔐 Авторизація через Passport (реалізовано через server.js)
- Локальна стратегія (email + password)
- Passport session + express-session
- Сесії з cookie (httpOnly, secure)
- Серіалізація/десеріалізація:

### Серіалізація / десеріалізація
Passport зберігає ID користувача у cookie при вході (`serializeUser`), а потім відновлює об'єкт користувача з пам’яті (`deserializeUser`):

```js
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  const user = dummyUsers.find(u => u.id === Number(id));
  done(null, user || false);
});
```

---

## 🧩 Реалізована функціональність
### 🔐 Авторизація та автентифікація
- SSR-реєстрація, вхід, захищені сторінки
- API-реєстрація, вхід, захищені запити через JWT
- Сесії через cookie та Passport
- Logout (очищення токенів або сесій)
### 👤 Користувачі
- SSR: список, перегляд, захищена сторінка
- API:
  - `GET /api/profile` — отримання поточного профілю
  - `PUT /api/profile` — оновлення профілю користувача (імʼя, email, пароль)
  - `POST /api/forgot-password` — генерація нового пароля та надсилання на email
- Middleware:
  - `protect` — перевірка автентифікації через сесію
  - `jwtProtect` — перевірка JWT токена (для API-запитів)
### 🛒 Товари
- SSR: `/products`, `/products/:id`
- API:
  - `GET /products/api`
  - `GET /products/api/:id`
  - `POST /products/api` (admin only)
  - `PUT /products/api/:id` (admin only)
  - `DELETE /products/api/:id` (admin only)
### 🛡️ Адмін доступ
- Middleware `adminOnly` обмежує CRUD по товарах
- Користувач позначається як `isAdmin: true`
### 🧪 Відновлення пароля
- `POST /api/forgot-password`
- Новий пароль надсилається на email
- Вся SMTP-конфігурація — через `.env`
### 🎨 Теми
- Збереження теми (light/dark) у cookie
- Рендеринг SSR з темою через `res.locals.theme`
### 🧾 Middleware
- `logRequestsMiddleware` — логування запитів
- `errorHandlerMiddleware` — глобальний обробник помилок
- `validationUserInput.js` — базова валідація введення

---
# 📧 Email Configuration (Nodemailer)
Функція `/api/forgot-password` використовує Nodemailer для надсилання листів із новими паролями. Для цього потрібно вказати SMTP-налаштування у `.env`:

### 🔐 Приклад server/.env
```
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
NODE_ENV=development
```
### 📌 Пояснення змінних

| Змінна          | Опис                                                              |
|------------------|-------------------------------------------------------------------|
| `EMAIL_SERVICE`  | Поштова служба (`gmail`, `yahoo`, або SMTP-хост)                 |
| `EMAIL_USER`     | Email, з якого будуть надсилатися листи                          |
| `EMAIL_PASS`     | App Password або SMTP пароль (не звичайний пароль!)              |
| `NODE_ENV`       | Має бути `production`, щоб активувати secure cookie              |
### ⚠️ Gmail users
1. Активуйте [2FA](https://myaccount.google.com/security).
2. Створіть [App Password](https://myaccount.google.com/apppasswords).
3. Вставте в `.env` у вигляді `EMAIL_PASS=...`.


### 🧪 Тестування
```http
POST /api/forgot-password
Content-Type: application/json
{
  "email": "user@example.com"
}
```
Користувач отримає новий тимчасовий пароль на пошту.
## 🌐 MongoDB Atlas Integration
Сервер підключено до MongoDB Atlas через бібліотеку Mongoose. Дані зберігаються у колекції `products`.
MONGO_URI=mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/dbname

### 🔌 Підключення
Створіть `.env` файл і додайте:

## ⚙️ Запуск
### Встановіть залежності:

```bash
cd server
npm install
````

### Запустіть сервер:

```bash
npm start        # або
npm run dev      # з nodemon
```

## 🔹 API: Маршрути та функціональність

### ▶️ **Створення документів**

#### ➕ `POST http://localhost:5000/api/products`

Створити один продукт  
**Тіло (JSON):**

```json
{
  "name": "Test Product",
  "category": "Electronics",
  "price": 120,
  "currency": "USD",
  "imageUrl": "https://example.com/image.jpg",
  "description": "Some text"
}
```

#### ➕ `POST http://localhost:5000/api/products/bulk`

Створити кілька продуктів
**Тіло (JSON):**

```json
[
  {
    "name": "3D Принтер Formlabs Form 4B",
    "brand": "Formlabs",
    "model": "Form 4B Basic Medical",
    "category": "3D Принтери SLA",
    "price": 27970,
    "currency": "PLN",
    "description": "Базовий медичний SLA-принтер серії 4B",
    "imageUrl": "/uploads/sla.jpg"
  },
  {
    "name": "3D Принтер Anycubic Photon Mono X",
    "brand": "Anycubic",
    "model": "Photon Mono X",
    "category": "3D Принтери Resin",
    "price": 13500,
    "currency": "PLN",
    "description": "Високоточний смоляний принтер для професійного друку",
    "imageUrl": "/uploads/anycubic.jpg"
  },
  {
    "name": "3D Принтер Creality Ender-5 S1",
    "brand": "Creality",
    "model": "Ender-5 S1",
    "category": "3D Принтери FDM",
    "price": 9900,
    "currency": "PLN",
    "description": "Компактний принтер із підтримкою високих температур та швидкісного друку",
    "imageUrl": "/uploads/ender5.jpg"
  }
]
```

---

### 🛠️ **Оновлення документів**

#### ✏️ `PATCH http://localhost:5000/api/products/6666`

Оновити один документ частково  
**Тіло:**

```json
{
  "price": 29900,
  "name": "Оновлений принтер",
  "category": "Оновлені SLA"
}
```

#### ✏️ `PATCH http://localhost:5000/api/products/bulk`

Оновити багато документів частково  
**Тіло:**

```json
[
  {
    "_id": "6855516ac0e1e0a2af33c6f8",
    "price": 39900,
    "name": "Новий Formlabs"
  },
  {
    "_id": "6855516ac0e1e0a2af33c6f9",
    "price": 99999
  }
]
```

#### 🔁 `PUT http://localhost:5000/api/products/685551cbc0e1e0a2af33c6fc`

Повна заміна документа  
**Тіло:**

```json
{
  "name": "Заміна SLA-принтера",
  "category": "3D Принтери SLA",
  "price": 777777,
  "currency": "PLN",
  "imageUrl": "/uploads/new-image.jpg",
  "description": "Повністю оновлений пристрій",
  "brand": "Formlabs",
  "model": "Form 5 Pro"
}
```

---

### ❌ **Видалення документів**

#### 🗑️ `DELETE http://localhost:5000/api/products/685551cbc0e1e0a2af33c6fc`

Видалити один продукт

#### 🗑️ `DELETE http://localhost:5000/api/products/bulk`

Видалити кілька документів  
**Тіло:**

```json
{
  "ids": ["6855516ac0e1e0a2af33c6fa", "6855516ac0e1e0a2af33c6f9"]
}
```

---

### 🔍 **Читання з проекцією**

#### 📄 `GET  http://localhost:5000/api/products`

Отримати всі продукти

#### 📄 `GET http://localhost:5000/api/products?fields=name,price`

Отримати лише поля `name` і `price`  
**Відповідь:**

```json
[
  { "_id": "...", "name": "3D A", "price": 21999 },
  { "_id": "...", "name": "3D B", "price": 29999 }
]
```

---

### Тестовий маршрут для перевірки пошти

**GET** `GET http://localhost:5000/email/test`

Надсилає тестовий лист для перевірки налаштування поштового сервера.

#### Відповідь

- `200 OK` — Лист успішно надіслано.
- `500 Internal Server Error` — Сталася помилка під час надсилання.

> ⚠️ Цей маршрут призначений лише для тестування. Не використовуйте в продакшені.

### Маршрут для зміни теми

**POST** `POST http://localhost:5000/set-theme`

Змінює тему сайту (світла/темна) шляхом встановлення cookie.

#### Тіло запиту (`application/json`)

```json
{
  "theme": "light" // або "dark"
}
```

---
