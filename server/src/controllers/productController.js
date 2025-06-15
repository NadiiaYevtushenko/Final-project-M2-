// 🔹 Dummy дані товарів
const products = [
  { id: 1, name: '3D Printer FDM', price: '500 USD', description: 'Basic FDM printer' },
  { id: 2, name: 'Resin SLA Printer', price: '800 USD', description: 'High-res resin printer' },
];

// http://localhost:5000/products             // SSR сторінка
//http://localhost:5000/products/1      // SSR один товар

//http://localhost:5000/products/api         // JSON API
//http://localhost:5000/products/api/1       // JSON API один товар

// ===================================
// 🔹 SSR (EJS) Маршрути
// ===================================

// 🔍 GET /products — рендер усіх товарів
const renderAllProducts = (req, res) => {
  res.render('ejs/products/index.ejs', { title: 'Products', products });
};

// 🔍 GET /products/:id — рендер одного товару
const renderProductById = (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).send('Product not found');
  res.render('ejs/products/show.ejs', {
    title: product.name,
    product,
  });
};

// ===================================
// 🔹 API (JSON) Маршрути
// ===================================

const getAllProducts = (req, res) => {
  res.json(products);
};

const getProductById = (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.productId));
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
};

const createProduct = (req, res) => {
  const { name, price, description } = req.body;
  const newProduct = {
    id: products.length + 1,
    name,
    price,
    description,
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
};

const updateProduct = (req, res) => {
  const { name, price, description } = req.body;
  const product = products.find(p => p.id === parseInt(req.params.productId));
  if (!product) return res.status(404).json({ message: 'Product not found' });

  product.name = name || product.name;
  product.price = price || product.price;
  product.description = description || product.description;

  res.json(product);
};

const deleteProduct = (req, res) => {
  const index = products.findIndex(p => p.id === parseInt(req.params.productId));
  if (index === -1) return res.status(404).json({ message: 'Product not found' });

  const deleted = products.splice(index, 1);
  res.json({ message: 'Product deleted', product: deleted[0] });
};

// ===================================
// 🔹 Експорт
// ===================================
module.exports = {
  renderAllProducts,
  renderProductById,
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
