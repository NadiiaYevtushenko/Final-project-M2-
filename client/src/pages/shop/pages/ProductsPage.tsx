import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import ProductCard from '../components/ProductCard';
import './ProductsPage.css';
import type { Product } from '../../../api/productsApi';

const ProductsPage = () => {
  const { slug } = useParams(); // /shop/:slug
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!slug) return;

    // ✅ updated route: /api/products?category=slug
    fetch(`http://localhost:5000/api/products?category=${encodeURIComponent(slug)}`)
      .then((res) => {
        if (!res.ok) throw new Error('404');
        return res.json();
      })
      .then(setProducts)
      .catch(() => setError('Не вдалося завантажити товари.'));
  }, [slug]);

  return (
    <section className="grid-container">
      {error && <p>{error}</p>}
      {!error &&
        products.map((product) => (
          <ProductCard
            key={product._id}
            id={product._id}
            title={product.name}
            brand={product.brand}
            model={product.model}
            price={product.price}
            oldPrice={product.oldPrice}
            discountPercent={product.discountPercent}
            image={product.imageUrl}
            categorySlug={product.categorySlug}
            slug={product.slug}
          />
        ))}
    </section>
  );
};

export default ProductsPage;
