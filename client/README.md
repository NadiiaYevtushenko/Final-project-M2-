# 🧩 3D Products Frontend

Це фронтенд частина інтернет-магазину для продажу 3D-продукції. Реалізовано з використанням React, Redux Toolkit та Vite. Підтримує темну/світлу тему, модальні форми реєстрації та входу, авторизацію через JWT (через cookie), а також інтеграцію з Firebase для адмінки.

---

## 🔧 Використані технології

**Фреймворки та бібліотеки:**

- React 19
- Redux Toolkit
- React Routerа
- Firebase (адмінські операції з БД)
- MUI (Material UI)
- Formik + Yup
- js-cookie
- FontAwesome

**Dev stack:**

- TypeScript
- Vite
- ESLint + Prettier
- @vitejs/plugin-react

---

## 📑 Реалізований функціонал

- 🌗 Перемикання теми (light/dark) збережене у cookie
- 🔐 JWT авторизація через власний Express-сервер:
  - зберігання токенів у cookie (HttpOnly)
  - AuthContext.tsx для контролю сесії клієнта
- 🧾 Повноекранні модальні форми:

  - Реєстрації
  - Входу
  - Відновлення пароля

- 📦 Завантаження товарів з Express API (через fetch):

  - `GET /api/products/categories` — список категорій
  - `GET /api/products/category/:slug` — товари з категорії
  - Завантаження зображень з Express-сервера (`/uploads/*.jpg`)

- 🛠️ Firebase використовується тільки для керування товарами в адмін-панелі

- 🛒 Ще в процесі підготовка до реалізації інтернет-магазину:
  - Форма додавання продукту
  - Валідація продукту
  - Категорії, варіації, фото

---

## 🧭 Основні сторінки

- `/` – Головна
- `/shop` – Каталог продукції
- `/shop/:category` – Товари певної категорії
- `/services` – Послуги
- `/contact` – Контакти з формою
- `/admin` – Адмінка (доступна лише після логіну(в розробці))

---

## 🗂 Структура фронтенду (src/)

```
src/
├── StoreProvider.tsx
├── app
│   ├── AuthContext.tsx
│   ├── ThemeProvider.tsx
│   ├── admin
│   │   ├── api
│   │   │   ├── customerDB.ts
│   │   │   ├── firebase.ts
│   │   │   └── productsDB.ts
│   │   └── components
│   │       ├── LoginForm/
│   │       │   ├── LoginForm.tsx
│   │       │   ├── LoginModal.tsx
│   │       │   └── loginForm.module.css
│   │       ├── PasswordRecovery/
│   │       │   ├── ForgotPasswordModal.tsx
│   │       │   └── loginForm.module.css
│   │       ├── ProductForm/
│   │       │   ├── CategorySelect.tsx
│   │       │   ├── ProductDescriptionInput.tsx
│   │       │   ├── ProductForm.tsx
│   │       │   ├── ProductImageInput.tsx
│   │       │   ├── ProductNameInput.tsx
│   │       │   ├── SimpleProduct.tsx
│   │       │   ├── VariationInput.tsx
│   │       │   └── productForm.module.css
│   │       └── RegisterForm/
│   │           ├── ConfirmationMessage.tsx
│   │           ├── FormField.tsx
│   │           ├── RegisterModal.module.css
│   │           ├── RegisterModal.tsx
│   │           └── SuccessModal.tsx
│   ├── contactSlice.ts
│   ├── data/
│   │   ├── categories.ts
│   │   └── headerNavLinks.ts
│   ├── error.tsx
│   ├── helpers/
│   │   └── typings.d.ts
│   ├── hooks.ts
│   ├── store.ts
│   ├── styles/
│   │   ├── globals.css
│   │   └── normalize.css
│   ├── theme.tsx
│   └── useAppDispatch.ts
├── assets/
│   ├── *.svg / *.png / *.jpg / *.webp  (банери, іконки, фото товарів)
├── main.tsx
├── page.module.css
├── vite-env.d.ts                 # Точка входу
```

---

## 🚀 Як запустити проєкт

> Вимоги: Node.js ≥ 18, Yarn або npm

```bash
# 1. Встановлення залежностей
yarn install

# 2. Запуск у режимі розробки
yarn dev

# або з npm:
npm install
npm run dev
```

Проєкт запуститься на: http://localhost:3000

---
