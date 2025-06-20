import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { resolveCategoryInfo } from '../lib/categories';
import style from '../styles/shop.module.css';

type Category = {
  slug: string;
  name: string;
};

const ShopPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/products/categories')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(setCategories)
      .catch((err) => {
        console.error('❌ Error loading categories:', err);
        setError('Не вдалося завантажити категорії товарів.');
      });
  }, []);

  if (error) {
    return <p className={style.error}>{error}</p>;
  }

  return (
    <section className={style.shopSection}>
      <header>
        <h1 className={style.shopTitle}>Магазин</h1>
        <p className={style.shopDescription}>
          Магазин C3D пропонує все для 3D друку і 3D сканування: 3D принтери, 3D сканери,
          3D пластик, фотополімери та інші витратні матеріали. Також ви можете замовити
          у нас послуги з 3D друку, 3D моделювання та 3D сканування.
        </p>
      </header>

      <div className={style.grid} role="list">
        {categories.map((cat) => {
          const info = resolveCategoryInfo(cat.slug);
          if (!info) return null;

          const { title, img } = info;

          return (
            <Link to={`/shop/${cat.slug}`} key={cat.slug} className={style.card}>
              <article role="listitem">
                <img src={img} alt={title} className={style.cardImg} loading="lazy" />
                <h2 className={style.cardTitle}>{title}</h2>
              </article>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default ShopPage;
