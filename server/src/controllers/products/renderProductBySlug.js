const Product = require('../../models/Product');

module.exports = async (req, res, next) => {
  const { categorySlug, productSlug } = req.params;

  try {
    const product = await Product.findOne({ categorySlug, slug: productSlug }).lean();

    if (!product) {
      return res.status(404).render('ejs/products/index.ejs', {
        title: 'Продукт не знайдено',
        categorySlug,
        productSlug,
      });
    }

    res.render('ejs/products/show.ejs', {
      title: product.name,
      product,
    });
  } catch (err) {
    console.error('❌ Error in renderProductBySlug:', err);
    next(err);
  }
};
