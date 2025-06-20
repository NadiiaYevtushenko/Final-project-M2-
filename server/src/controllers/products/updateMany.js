const Product = require('../../models/Product');
const slugify = require('../../utils/slugify');

module.exports = async (req, res, next) => {
  try {
    const updates = req.body;

    if (!Array.isArray(updates)) {
      return res.status(400).json({ message: 'Expected array of updates' });
    }

    const results = [];

    for (const item of updates) {
      const { _id, ...fields } = item;

      if (!_id) {
        results.push({ error: 'Missing _id' });
        continue;
      }

      if (fields.name) fields.slug = slugify(fields.name);
      if (fields.category) fields.categorySlug = slugify(fields.category);

      const updated = await Product.findByIdAndUpdate(_id, fields, { new: true });
      results.push(updated || { _id, error: 'Not found' });
    }

    res.json(results);
  } catch (err) {
    next(err);
  }
};
