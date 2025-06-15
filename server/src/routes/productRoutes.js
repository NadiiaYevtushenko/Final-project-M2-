const express = require('express');
const { protect: auth } = require('../middleware/authMiddleware.js');
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
// 🔹 SSR (EJS Pages)
router.get('/', renderAllProducts);            // /products/
router.get('/:id', renderProductById);    // /products/view/1

//
// 🔹 API (JSON)
router.get('/api', getAllProducts);                         // /products/api
router.get('/api/:productId', getProductById);              // /products/api/2
router.post('/api', auth, adminOnly, createProduct);
router.put('/api/:productId', auth, adminOnly, updateProduct);
router.delete('/api/:productId', auth, adminOnly, deleteProduct);

module.exports = router;
