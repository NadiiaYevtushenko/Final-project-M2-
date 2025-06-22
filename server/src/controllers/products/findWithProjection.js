const Product = require('../../models/Product');

module.exports = async (req, res, next) => {
  try {
    const { fields, limit, sort, category } = req.query;

    // 🎯 Побудова проєкції
    const projection = fields
      ? Object.fromEntries(
          fields.split(',').map(field => [field.trim(), 1])
        )
      : undefined;

    //  Побудова фільтру
    const filter = category ? { categorySlug: category } : {};

    const query = Product.find(filter, projection);

    //  Сортування
    if (sort) query.sort(sort);

    //  Обмеження
    const parsedLimit = parseInt(limit, 10);
    if (!isNaN(parsedLimit) && parsedLimit > 0) {
      query.limit(parsedLimit);
    }

    const result = await query.lean();
    res.json(result);
  } catch (err) {
    console.error('❌ Failed to find products:', err);
    next(err);
  }
};
