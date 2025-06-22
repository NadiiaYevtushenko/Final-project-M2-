const Product = require('../../models/Product');
const slugify = require('../../utils/slugify');
const mongoose = require('mongoose');

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid or missing product ID' });
    }

    //  Генерація slug-ів, якщо відповідні поля оновлюються
    if (updates.name) updates.slug = slugify(updates.name);
    if (updates.category) updates.categorySlug = slugify(updates.category);

    const updated = await Product.findByIdAndUpdate(id, updates, {
      new: true,              // повертає оновлений документ
      runValidators: true,    // валідація згідно зі схемою
    });

    if (!updated) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(updated);
  } catch (err) {
    next(err);
  }
};
