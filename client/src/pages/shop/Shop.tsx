import style from './shop.module.css';
import categories from './categories';
import { Link } from 'react-router';

const ShopPage = () => {
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
        {categories.map((cat, index) => (
          <Link to={`/shop/${cat.slug}`} key={index} className={style.card}>
            <article role="listitem">
              <img
                src={cat.img}
                alt={cat.title}
                className={style.cardImg}
                loading="lazy"
                decoding="async"
              />
              <h2 className={style.cardTitle}>{cat.title}</h2>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ShopPage;