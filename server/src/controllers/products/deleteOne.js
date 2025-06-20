const Product = require('../../models/Product');

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleted = await Product.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted', product: deleted });
  } catch (err) {
    next(err);
  }
};
