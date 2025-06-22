const Product = require('../../models/Product');
const slugify = require('../../utils/slugify');

module.exports = async (req, res, next) => {
  try {
    const data = Array.isArray(req.body) ? req.body : [];

    if (data.length === 0) {
      return res.status(400).json({ error: 'Empty product array' });
    }

    //  Генеруємо слаги вручну (бо insertMany не запускає pre('save'))
    const enrichedData = data.map(p => ({
      ...p,
      slug: slugify(p.name),
      categorySlug: slugify(p.category),
    }));

    const result = await Product.insertMany(enrichedData, {
      ordered: true,
      rawResult: false,
    });

    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};
