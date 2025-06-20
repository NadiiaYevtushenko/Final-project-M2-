const Product = require('../../models/Product');

module.exports = async (req, res, next) => {
  try {
    const products = await Product.find().lean();
    res.render('ejs/products/index.ejs', { title: 'Products', products });
  } catch (err) {
    next(err);
  }
};
