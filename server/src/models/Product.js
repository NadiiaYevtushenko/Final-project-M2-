const mongoose = require('mongoose');
const slugify = require('../utils/slugify');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: Number,
  currency: String,
  category: { type: String, required: true },
  slug: { type: String, required: true },           // slug для product.name
  categorySlug: { type: String, required: true },   // slug для category
  imageUrl: String,
  description: String,
});

// 🧠 Автоматична генерація slug-ів при збереженні
productSchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name);
  }

  if (this.isModified('category')) {
    this.categorySlug = slugify(this.category);
  }

  next();
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
