const express = require('express');
const { jwtProtect } = require('../middleware/authMiddleware');
const adminOnly = require('../middleware/adminMiddleware');

const {
  // 🔹 API Controllers
  getAllProducts,
  getProductsByCategory,
  getProductById,
  getCategoryList,
  createProduct,
  updateProduct,
  deleteProduct,

  // 🔹 SSR Controllers
  renderAllProducts,
  renderAllProductsFromDB,
  renderProductsByCategory,
  renderCategoryList,
  renderProductBySlug,
} = require('../controllers/productController');

const router = express.Router();

// ==========================================
// 🔹 REST API ROUTES (/api/products/*)
// ==========================================

router.get('/api', getAllProducts);
router.get('/api/categories', getCategoryList);
router.get('/api/category/:slug', getProductsByCategory);
router.get('/api/:productId', getProductById);
router.post('/api', jwtProtect, adminOnly, createProduct);
// router.put('/api/:productId', jwtProtect, adminOnly, updateProduct);
// router.delete('/api/:productId', jwtProtect, adminOnly, deleteProduct);

// ==========================================
// 🔹 SSR ROUTES (/products/*)
// ==========================================

router.get('/db', renderAllProductsFromDB);
router.get('/categories', renderCategoryList);
router.get('/category/:slug', renderProductsByCategory);
router.get('/:categorySlug/:productSlug', renderProductBySlug);  // 🛠 fixed route
router.get('/', renderAllProducts);

module.exports = router;
