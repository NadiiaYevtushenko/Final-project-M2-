const Product = require('../../models/Product');

module.exports = async (req, res, next) => {
  try {
    const { fields, limit, sort } = req.query;

    // 🔍 Створюємо projection з query-параметра
    let projection = undefined;
    if (fields) {
      projection = {};
      fields.split(',').forEach(field => {
        projection[field.trim()] = 1;
      });
    }

    // 🔄 Будуємо запит
    const query = Product.find({}, projection);
    if (sort) query.sort(sort);
    if (limit) query.limit(Number(limit));

    const result = await query.lean();
    res.json(result);
  } catch (err) {
    next(err);
  }
};
