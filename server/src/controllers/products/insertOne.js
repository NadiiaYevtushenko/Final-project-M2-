const Product = require('../../models/Product');
const slugify = require('../../utils/slugify');

module.exports = async (req, res, next) => {
  try {
    const { name, price, description, imageUrl, category, currency } = req.body;

    const newProduct = new Product({
      name,
      price,
      description,
      imageUrl,
      category,
      currency,
      slug: slugify(name),
      categorySlug: slugify(category),
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    next(err);
  }
};
