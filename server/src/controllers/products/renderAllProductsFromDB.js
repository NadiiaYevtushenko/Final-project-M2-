const Product = require('../../models/Product');

module.exports = async (req, res) => {
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
