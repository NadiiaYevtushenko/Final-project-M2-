const Product = require('../../models/Product');
const mongoose = require('mongoose');

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;

    //  Перевірка на валідний ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    // 🗑️ Видалення продукту
    const deleted = await Product.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({
      message: 'Product deleted successfully',
      product: deleted,
    });
  } catch (err) {
    console.error('❌ Error in deleteOne:', err);
    next(err);
  }
};
