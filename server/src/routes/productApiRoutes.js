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
          name: { $first: '$category' },
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

// ========== 🔹 Cursor Streaming ==========

// 🔸 Потокове читання продуктів через курсор
router.get('/stream', async (req, res) => {
  try {
    const cursor = Product.find().cursor();

    res.setHeader('Content-Type', 'application/json');
    res.write('[');
    let first = true;

    for await (const doc of cursor) {
      if (!first) res.write(',');
      res.write(JSON.stringify(doc));
      first = false;
    }

    res.write(']');
    res.end();
  } catch (err) {
    console.error('❌ Error in streaming products:', err);
    res.status(500).json({ error: 'Streaming failed' });
  }
});

// ========== 🔹 Aggregation ==========

// 🔸 Середня ціна і кількість товарів за категоріями
router.get('/stats/avg-price-by-category', async (req, res) => {
  try {
    const stats = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          averagePrice: { $avg: '$price' },
          count: { $sum: 1 },
        },
      },
      { $sort: { averagePrice: -1 } }
    ]);
    res.json(stats);
  } catch (err) {
    console.error('❌ Aggregation error:', err);
    res.status(500).json({ error: 'Aggregation failed' });
  }
});

module.exports = router;
