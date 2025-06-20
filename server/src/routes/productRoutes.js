const Product = require('../models/Product');

// ========== 🔹 SSR ==========
const renderAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find().lean();
    res.render('ejs/products/index.ejs', { title: 'Products', products });
  } catch (err) {
    next(err);
  }
};

const renderCategoryList = async (req, res, next) => {
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

const renderProductsByCategory = async (req, res, next) => {
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

const renderProductBySlug = async (req, res, next) => {
  const { categorySlug, productSlug } = req.params;

  try {
    const product = await Product.findOne({ categorySlug, slug: productSlug }).lean();
    if (!product) return res.status(404).send('Product not found');

    res.render('ejs/products/show.ejs', {
      title: product.name,
      product,
    });
  } catch (err) {
    next(err);
  }
};

const renderAllProductsFromDB = async (req, res) => {
  try {
    const products = await Product.find().lean();
    res.render('ejs/products/index.ejs', {
      title: 'Products from MongoDB',
      products,
    });
  } catch (err) {
    res.status(500).send('Помилка при отриманні товарів з БД');
  }
};

// ========== 🔹 API Redirect Notice ==========
// API методи винесено до окремих модулів (наприклад: insertOne.js, updateOne.js...)

// ========== 🔹 Export ==========
module.exports = {
  renderAllProducts,
  renderAllProductsFromDB,
  renderProductsByCategory,
  renderCategoryList,
  renderProductBySlug,
};
