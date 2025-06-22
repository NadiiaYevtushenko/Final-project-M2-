const Product = require('../../models/Product');

module.exports = async (req, res, next) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 }).lean();

    res.render('ejs/products/index.ejs', {
      title: 'Усі товари',
      products,
    });
  } catch (err) {
    console.error('❌ Error in renderAllProducts:', err);
    next(err);
  }
};
