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

// ========== 🔹 SSR PAGES (GET: Render views) ==========

// 🔸 All products (with optional DB note)
router.get('/', renderAllProducts);                        // /
router.get('/db', renderAllProductsFromDB);               // /db

// 🔸 Category listings
router.get('/categories', renderCategoryList);            // /categories
router.get('/category/:slug', renderProductsByCategory);  // /category/laptops

// 🔸 Single product page
router.get('/:categorySlug/:productSlug', renderProductBySlug); // /laptops/dell-xps-15

// ========== 🔹 SSR ACTION ROUTES (POST: Forms) ==========

// 🔸 Create product
router.post('/create', insertOne);                        // POST from admin form

// 🔸 Delete product by ID (e.g. admin panel action)
router.post('/delete/:id', deleteOne);                    // POST from delete button/form

module.exports = router;