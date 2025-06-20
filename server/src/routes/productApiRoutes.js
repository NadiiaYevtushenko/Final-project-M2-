const express = require('express');
const router = express.Router();

// 🔹 Controllers
const insertOne = require('../controllers/products/insertOne');
const insertMany = require('../controllers/products/insertMany');
const updateOne = require('../controllers/products/updateOne');
const updateMany = require('../controllers/products/updateMany');
const replaceOne = require('../controllers/products/replaceOne');
const deleteOne = require('../controllers/products/deleteOne');
const deleteMany = require('../controllers/products/deleteMany');
const findWithProjection = require('../controllers/products/findWithProjection');
const Product = require('../models/Product');

// ========== 🔹 RESTful Product API ==========

// 🔸 Create
router.post('/', insertOne);              // POST   /api/products
router.post('/bulk', insertMany);         // POST   /api/products/bulk

// 🔸 Read
router.get('/', findWithProjection);      // GET    /api/products?fields=...

// 🔸 Update
router.patch('/:id', updateOne);          // PATCH  /api/products/:id
router.patch('/bulk', updateMany);        // PATCH  /api/products/bulk
router.put('/:id', replaceOne);           // PUT    /api/products/:id (replace)

// 🔸 Delete
router.delete('/:id', deleteOne);         // DELETE /api/products/:id
router.delete('/bulk', deleteMany);       // DELETE /api/products/bulk


// 🔸 Get distinct categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await Product.aggregate([
      {
        $group: {
          _id: '$categorySlug',
          name: { $first: '$category' }, // Припускаємо, що поле 'category' зберігається в documents
          imageUrl: { $first: '$imageUrl' },
        },
      },
    ]);
    res.json(categories);
  } catch (err) {
    console.error('❌ Failed to load categories:', err);
    res.status(500).json({ error: 'Failed to load categories' });
  }
});

module.exports = router;
