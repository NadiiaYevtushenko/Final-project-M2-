const Product = require('../../models/Product');

module.exports = async (req, res, next) => {
  try {
    const categories = await Product.aggregate([
      {
        $group: {
          _id: '$categorySlug',
          name: { $first: '$category' },
          imageUrl: { $first: '$imageUrl' } // можна прибрати, якщо не використовуєш
        }
      },
      { $sort: { name: 1 } } // сортуємо категорії за назвою
    ]);
    console.log(categories);
    res.render('ejs/products/categories.ejs', {
      title: 'Категорії товарів',
      categories,
    });
  } catch (err) {
    console.error('❌ Error in renderCategoryList:', err);
    next(err);
  }
};
