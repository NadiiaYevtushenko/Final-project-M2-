const Product = require('../../models/Product');
const mongoose = require('mongoose');

module.exports = async (req, res, next) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: 'Expected non-empty array of IDs' });
    }

    //  Валідація _id
    const validIds = ids.filter(id => mongoose.Types.ObjectId.isValid(id));

    if (validIds.length === 0) {
      return res.status(400).json({ message: 'No valid IDs provided' });
    }

    const result = await Product.deleteMany({ _id: { $in: validIds } });

    res.status(200).json({
      message: 'Products deleted successfully',
      deletedCount: result.deletedCount,
      acknowledged: result.acknowledged,
      attemptedCount: ids.length,
      validCount: validIds.length,
    });
  } catch (err) {
    console.error('❌ Error in deleteMany:', err);
    next(err);
  }
};
