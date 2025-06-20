const express = require('express');
const router = express.Router();

// 🔹 SSR Render Controllers
const renderAllProducts = require('../controllers/products/renderAllProducts');
const renderAllProductsFromDB = require('../controllers/products/renderAllProductsFromDB');
const renderProductsByCategory = require('../controllers/products/renderProductsByCategory');
const renderCategoryList = require('../controllers/products/renderCategoryList');
const renderProductBySlug = require('../controllers/products/renderProductBySlug');

// 🔹 SSR Action Controllers
const insertOne = require('../controllers/products/insertOne');
const deleteOne = require('../controllers/products/deleteOne');

// ======= SSR ROUTES (EJS) =======

// GET: сторінки
router.get('/db', renderAllProductsFromDB);
router.get('/categories', renderCategoryList);
router.get('/category/:slug', renderProductsByCategory);
router.get('/:categorySlug/:productSlug', renderProductBySlug);
router.get('/', renderAllProducts);

// POST: дії
router.post('/create', insertOne);
router.post('/delete/:id', deleteOne);

module.exports = router;
