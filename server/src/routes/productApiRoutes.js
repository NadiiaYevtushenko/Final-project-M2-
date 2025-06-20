const express = require('express');
const router = express.Router();

const insertOne = require('../controllers/products/insertOne');
const insertMany = require('../controllers/products/insertMany');
const updateOne = require('../controllers/products/updateOne');
const updateMany = require('../controllers/products/updateMany');
const replaceOne = require('../controllers/products/replaceOne');
const deleteOne = require('../controllers/products/deleteOne');
const deleteMany = require('../controllers/products/deleteMany');
const findWithProjection = require('../controllers/products/findWithProjection');

// RESTful API-style routes
router.post('/', insertOne); // ✅ /api/products
router.post('/bulk', insertMany); // ✅ /api/products/bulk
router.patch('/bulk', updateMany);      // ✅ /api/products/bulk
router.patch('/:id', updateOne);        // ✅ /api/products/:id
router.put('/:id', replaceOne);
router.delete('/bulk', deleteMany);   // ✅ /api/products/bulk
router.delete('/:id', deleteOne);     // ✅ /api/products/:id
router.get('/', findWithProjection);  // ✅ /api/products?fields=...

module.exports = router;
