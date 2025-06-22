const Product = require('../../models/Product');
const slugify = require('../../utils/slugify');
const mongoose = require('mongoose');

module.exports = async (req, res, next) => {
  try {
    const updates = req.body;

    if (!Array.isArray(updates)) {
      return res.status(400).json({ message: 'Expected array of updates' });
    }

    // Паралельні оновлення через Promise.all
    const results = await Promise.all(updates.map(async item => {
      const { _id, ...fields } = item;

      if (!_id || !mongoose.Types.ObjectId.isValid(_id)) {
        return { _id, error: 'Invalid or missing _id' };
      }

      if (fields.name) fields.slug = slugify(fields.name);
      if (fields.category) fields.categorySlug = slugify(fields.category);

      try {
        const updated = await Product.findByIdAndUpdate(
          _id,
          fields,
          { new: true, runValidators: true }
        );

        return updated || { _id, error: 'Not found' };
      } catch (err) {
        return { _id, error: err.message };
      }
    }));

    res.json(results);
  } catch (err) {
    next(err);
  }
};
