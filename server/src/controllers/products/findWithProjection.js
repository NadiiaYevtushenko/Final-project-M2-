const Product = require('../../models/Product');

module.exports = async (req, res, next) => {
  try {
    const { fields, limit, sort, category } = req.query;

    // 🔍 Побудова проєкції
    let projection = undefined;
    if (fields) {
      projection = {};
      fields.split(',').forEach(field => {
        projection[field.trim()] = 1;
      });
    }

    // 🔍 Побудова фільтру
    const filter = {};
    if (category) {
      filter.categorySlug = category;
    }

    const query = Product.find(filter, projection);
    if (sort) query.sort(sort);
    if (limit) query.limit(Number(limit));

    const result = await query.lean();
    res.json(result);
  } catch (err) {
    next(err);
  }
};
