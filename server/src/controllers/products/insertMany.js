const Product = require('../../models/Product');
const slugify = require('../../utils/slugify');

module.exports = async (req, res, next) => {
  try {
    const data = req.body.map(p => ({
      ...p,
      slug: slugify(p.name),
      categorySlug: slugify(p.category),
    }));
    const result = await Product.insertMany(data);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};
