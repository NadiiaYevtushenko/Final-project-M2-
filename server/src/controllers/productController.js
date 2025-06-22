const Product = require('../models/Product');
const slugify = require('../utils/slugify');

// ========== 🔹 SSR ==========

const renderAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find().lean();
    res.render('ejs/products/index.ejs', { title: 'Products', products });
  } catch (err) {
    next(err);
  }
};

const renderCategoryList = async (req, res, next) => {
  try {
    const categories = await Product.aggregate([
      {
        $group: {
          _id: '$categorySlug',
          category: { $first: '$category' },
        },
      },
    ]);
    console.log(categories); 
    res.render('ejs/products/categories', {
      title: 'Категорії товарів',
      categories,
    });
  } catch (err) {
    next(err);
  }
};

const renderProductsByCategory = async (req, res, next) => {
  const categorySlug = decodeURIComponent(req.params.slug || '').trim();
  if (!categorySlug) return res.status(400).send('❌ Категорія не вказана');

  try {
    const products = await Product.find({ categorySlug }).lean();
    if (!products.length)
      return res.status(404).send('Категорія не знайдена');

    res.render('ejs/products/category.ejs', {
      title: `Категорія: ${products[0].category}`,
      category: products[0].category,
      products,
    });
  } catch (err) {
    next(err);
  }
};

const renderProductBySlug = async (req, res, next) => {
  const { categorySlug, productSlug } = req.params;

  try {
    const product = await Product.findOne({ categorySlug, slug: productSlug }).lean();
    if (!product) return res.status(404).send('Product not found');

    res.render('ejs/products/show.ejs', {
      title: product.name,
      product,
    });
  } catch (err) {
    next(err);
  }
};

const renderAllProductsFromDB = async (req, res) => {
  try {
    const products = await Product.find().lean();
    res.render('ejs/products/index.ejs', {
      title: 'Products from MongoDB',
      products,
    });
  } catch (err) {
    res.status(500).send('Помилка при отриманні товарів з БД');
  }
};

// ========== 🔹 API ==========

const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    next(err);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    next(err);
  }
};

const getProductsByCategory = async (req, res) => {
  try {
    const categorySlug = decodeURIComponent(req.params.slug || '').trim();
    if (!categorySlug) return res.status(400).json({ message: 'Missing category slug' });

    const products = await Product.find({ categorySlug }).lean();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products', error: err.message });
  }
};

const getCategoryList = async (req, res) => {
  try {
    const categories = await Product.aggregate([
      {
      $group: {
        _id: '$categorySlug',
        category: { $first: '$category' },
        imageUrl: { $first: '$imageUrl' } 
      }
    },
    {
      $project: {
        _id: 0,
        slug: '$_id',
        name: '$category',
        imageUrl: 1
      }
    }
    ]);
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching categories', error: err.message });
  }
};

const createProduct = async (req, res, next) => {
  try {
    const { name, price, description, imageUrl, category, currency } = req.body;

    const newProduct = new Product({
      name,
      price,
      description,
      imageUrl,
      category,
      currency,
      slug: slugify(name),
      categorySlug: slugify(category),
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    next(err);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { name, price, description, imageUrl, category, currency } = req.body;
    const product = await Product.findById(req.params.productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    product.name = name ?? product.name;
    product.price = price ?? product.price;
    product.description = description ?? product.description;
    product.imageUrl = imageUrl ?? product.imageUrl;
    product.category = category ?? product.category;
    product.currency = currency ?? product.currency;

    if (name) product.slug = slugify(name);
    if (category) product.categorySlug = slugify(category);

    const updated = await product.save();
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted', product });
  } catch (err) {
    next(err);
  }
};

// ========== 🔹 Export ==========
module.exports = {
  renderAllProducts,
  renderAllProductsFromDB,
  renderProductsByCategory,
  renderCategoryList,
  renderProductBySlug,
  getAllProducts,
  getProductById,
  getProductsByCategory,
  getCategoryList,
  createProduct,
  updateProduct,
  deleteProduct,
};
