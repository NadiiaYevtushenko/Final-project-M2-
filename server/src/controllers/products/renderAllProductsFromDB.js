const Product = require('../../models/Product');

module.exports = async (req, res, next) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 }).lean(); // нові перші

    res.render('ejs/products/index.ejs', {
      title: 'Products from MongoDB',
      products,
    });
  } catch (err) {
    console.error('❌ Failed to render products:', err);
    next(err); // або res.status(500).send(...)  залежить від middleware
  }
};
