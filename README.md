project-root/
│
├── client/ # Frontend (React + Redux Toolkit)
│ ├── public/ # Статичні ресурси (favicon, index.html)
│ ├── src/
│ │ ├── app/ # Глобальна конфігурація Redux store
│ │ │ ├── store.ts
│ │ │ └── hooks.ts
│ │ │ ├── helpers/
│ │ │ │ └── typings.d.ts
│ │ ├── features/ # Слайси Redux
│ │ │ ├── products/
│ │ │ │ ├── productsSlice.ts
│ │ │ │ ├── productsThunks.ts
│ │ │ │ └── types.ts
│ │ │ ├── cart/
│ │ │ ├── user/
│ │ │ ├── orders/
│ │ │ └── ui/ # Стан UI (модалки, спінери тощо)
│ │ │
│ │ ├── components/ # Спільні компоненти (Button, Input, Modal, Spinner)
│ │ │ └── ...
│ │ ├── pages/
        ├── Home.tsx           ← Головна (вітання, опис, CTA)
        ├── Shop.tsx           ← Магазин (список товарів)
        ├── Services.tsx       ← Послуги (3D-друк, сканування, литво і т.д.)
        ├── Contacts.tsx       ← Контактна форма + мапа
        ├── ProductDetails.tsx ← Деталі товару (через /shop/:id)
        ├── Cart.tsx           ← Повна сторінка кошика
        ├── Orders.tsx         ← Замовлення користувача (опціонально)
        └── NotFound.tsx       ← 404
│ │ │
│ │ ├── layouts/ # Шаблони сторінок (з header/footer)
│ │ │ └── MainLayout.tsx
│ │ ├── routes/ # Конфігурація роутінгу
│ │ │ └── AppRoutes.tsx
│ │ ├── services/ # API-клієнти (fetch/axios)
│ │ │ └── productApi.ts
│ │ ├── styles/ # CSS/SCSS/Figma-токени
│ │ ├── utils/ # Утиліти (форматування ціни, валідації тощо)
│ │ └── index.tsx # Точка входу React
│
├── server/ # Backend (Express.js)
│ ├── controllers/ # Логіка для маршрутів (products, users, orders)
│ ├── models/ # Mongoose/Prisma-схеми або прості JS-моделі
│ ├── routes/ # Ендпоінти (REST API)
│ │ ├── productRoutes.ts
│ │ ├── userRoutes.ts
│ │ ├── orderRoutes.ts
│ ├── middleware/ # auth, errorHandler, logger
│ ├── services/ # Бізнес-логіка
│ ├── config/ # DB config, env
│ ├── app.ts # Основна конфігурація Express
│ └── server.ts # Точка входу Node
│
├── shared/ # Спільні типи та утиліти між client/server (DTO)
├── .env # Змінні середовища
├── package.json
├── tsconfig.json
└── README.md
