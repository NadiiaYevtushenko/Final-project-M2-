const Product = require('../../models/Product');

module.exports = async (req, res, next) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: 'Expected non-empty array of IDs' });
    }

    const result = await Product.deleteMany({ _id: { $in: ids } });

    res.json({
      message: 'Products deleted',
      deletedCount: result.deletedCount,
      acknowledged: result.acknowledged
    });
  } catch (err) {
    next(err);
  }
};
