const Product = require('../../models/Product');

module.exports = async (req, res, next) => {
  try {
    const {
      name,
      price,
      description,
      imageUrl,
      category,
      currency,
      brand,
      model,
      oldPrice,
      discountPercent,
    } = req.body;

    const newProduct = new Product({
      name,
      price,
      description,
      imageUrl,
      category,
      currency,
      brand,
      model,
      oldPrice,
      discountPercent,
      //  НЕ включаємо slug та categorySlug — вони згенеруються в pre('save')
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    next(err);
  }
};
