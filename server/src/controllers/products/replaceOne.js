const Product = require('../../models/Product');
const slugify = require('../../utils/slugify');
const mongoose = require('mongoose');

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

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

    if (!name || !category || price == null || !currency) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const replacement = {
      _id: id, // важливо: _id має бути збережено
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

    const result = await Product.replaceOne({ _id: id }, replacement, {
      runValidators: true,
    });

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: 'Product not found or unchanged' });
    }

    const updated = await Product.findById(id);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};
