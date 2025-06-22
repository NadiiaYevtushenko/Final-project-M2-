const mongoose = require('mongoose');
const slugify = require('../utils/slugify');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    currency: { type: String, default: 'USD' },
    category: { type: String, required: true },
    slug: { type: String },
    categorySlug: { type: String },
    imageUrl: { type: String, default: '' },
    description: { type: String, default: '' },
  },
  {
    timestamps: true, // додає createdAt, updatedAt
  }
);

// 🧠 Автоматична генерація slug-ів
productSchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name);
  }
  if (this.isModified('category')) {
    this.categorySlug = slugify(this.category);
  }
  next();
});

// Для replaceOne + updateMany можна окремо додати middleware (за потреби)

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
