const express = require('express');
const router = express.Router();

const {
  renderAllProducts,
  renderAllProductsFromDB,
  renderProductsByCategory,
  renderCategoryList,
  renderProductBySlug,
} = require('../controllers/products/renderProductsController');

// 🔹 Список усіх товарів
router.get('/db', renderAllProductsFromDB);

// 🔹 Категорії
router.get('/categories', renderCategoryList);

// 🔹 Товари в категорії
router.get('/category/:slug', renderProductsByCategory);

// 🔹 Один товар всередині категорії
router.get('/category/:categorySlug/:productSlug', renderProductBySlug);

module.exports = router;
