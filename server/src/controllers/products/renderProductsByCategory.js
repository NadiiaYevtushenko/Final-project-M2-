const Product = require('../../models/Product');

module.exports = async (req, res, next) => {
  const categorySlug = decodeURIComponent(req.params.slug || '').trim();
  if (!categorySlug) return res.status(400).send('❌ Категорія не вказана');

  try {
    const products = await Product.find({ categorySlug }).lean();
    if (!products.length)
      return res.status(404).send('Категорія не знайдена');

    res.render('ejs/products/category.ejs', {
      title: `Категорія: ${products[0].category}`,
      category: products[0].category,
      products,
    });
  } catch (err) {
    next(err);
  }
};
