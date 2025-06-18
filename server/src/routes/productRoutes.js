const express = require('express'); 
const { protect, jwtProtect } = require('../middleware/authMiddleware');
const adminOnly = require('../middleware/adminMiddleware.js');

const {
  renderAllProducts,
  renderProductById,
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController.js');

const router = express.Router();

//
// 🔹 API (JSON)
// !!! Важливо — оголосити спочатку, щоб уникнути конфлікту з /:id
//
router.get('/api', getAllProducts);
router.get('/api/:productId', getProductById);
router.post('/api', jwtProtect, adminOnly, createProduct);
router.put('/api/:productId', jwtProtect, adminOnly, updateProduct);
router.delete('/api/:productId', jwtProtect, adminOnly, deleteProduct);

//
// 🔹 SSR (EJS Pages)
// Після API
//
router.get('/', renderAllProducts);
router.get('/:id', renderProductById);

module.exports = router;
