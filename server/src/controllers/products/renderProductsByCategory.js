const Product = require('../../models/Product');

module.exports = async (req, res, next) => {
  const categorySlug = decodeURIComponent(req.params.slug || '').trim();

  try {
    const products = await Product.find({ categorySlug }).lean();

    if (!products.length) {
      return res.status(200).render('ejs/products/index.ejs', {
        title: 'Категорія порожня',
        products: [],
        message: '❌ У цій категорії немає товарів',
      });
    }

    res.render('ejs/products/category.ejs', {
      title: `Категорія: ${products[0].category}`,
      category: products[0].category,
      products,
    });
  } catch (err) {
    next(err);
  }
};
