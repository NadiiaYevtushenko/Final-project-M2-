const Product = require('../../models/Product');
const slugify = require('../../utils/slugify');

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!id) return res.status(400).json({ message: 'Product ID is required' });

    if (updates.name) updates.slug = slugify(updates.name);
    if (updates.category) updates.categorySlug = slugify(updates.category);

    const updated = await Product.findByIdAndUpdate(id, updates, { new: true });

    if (!updated) return res.status(404).json({ message: 'Product not found' });

    res.json(updated);
  } catch (err) {
    next(err);
  }
};