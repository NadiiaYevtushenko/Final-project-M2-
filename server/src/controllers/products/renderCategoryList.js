const Product = require('../../models/Product');

module.exports = async (req, res, next) => {
  try {
    const categories = await Product.aggregate([
      { $group: { _id: '$categorySlug', category: { $first: '$category' } } }
    ]);

    res.render('ejs/products/categories.ejs', {
      title: 'Категорії товарів',
      categories,
    });
  } catch (err) {
    next(err);
  }
};
