const Product = require('../../models/Product');
const slugify = require('../../utils/slugify');

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      name,
      category,
      price,
      currency,
      imageUrl,
      description,
      brand,
      model,
      oldPrice,
      discountPercent
    } = req.body;

    // Перевірка на обовʼязкові поля
    if (!name || !category || price == null || !currency) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const replacement = {
      name,
      category,
      price,
      currency,
      imageUrl: imageUrl || '',
      description: description || '',
      brand: brand || '',
      model: model || '',
      oldPrice: oldPrice ?? null,
      discountPercent: discountPercent ?? null,
      slug: slugify(name),
      categorySlug: slugify(category),
    };

    const replaced = await Product.findOneAndReplace(
      { _id: id },
      replacement,
      { new: true, overwrite: true }
    );

    if (!replaced) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(replaced);
  } catch (err) {
    next(err);
  }
};
