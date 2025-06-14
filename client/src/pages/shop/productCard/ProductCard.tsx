import { Link } from 'react-router';
import style from './ProductCard.module.css';

type ProductCardProps = {
  id: string;
  title: string;
  brand: string;
  model: string;
  price: number;
  oldPrice?: number;
  image: string;
  countryCode?: string; // напр. 'pl'
  discountPercent?: number;
};

const ProductCard = ({
  id,
  title,
  brand,
  model,
  price,
  oldPrice,
  image,
  countryCode = 'pl',
  discountPercent,
}: ProductCardProps) => {
  return (
    <div className={style.card}>
      {/* Прапор + знижка */}
      <div className={style.topRow}>
        <img
          src={`https://flagcdn.com/24x18/${countryCode}.png`}
          alt="Країна"
          className={style.flag}
        />
        {discountPercent && <span className={style.discount}>-{discountPercent}%</span>}
      </div>

      {/* Зображення */}
      <Link to={`/product/${id}`} className={style.imageLink}>
        <img src={image} alt={title} className={style.image} loading="lazy" decoding="async" />
      </Link>

      {/* Назва */}
      <p className={style.brand}>{brand} {model}</p>
      <h3 className={style.title}>{title}</h3>

      {/* Ціни */}
      <div className={style.priceSection}>
        <span className={style.price}>{price.toLocaleString()} zł</span>
        {oldPrice && <span className={style.oldPrice}>{oldPrice.toLocaleString()} zł</span>}
      </div>

      {/* Купити */}
      <div className={style.actions}>
        <input type="number" min={1} defaultValue={1} className={style.quantity} />
        <button className={style.buyButton}>КУПИТИ</button>
      </div>

      {/* Додаткові дії */}
      <div className={style.bottomActions}>
        <button className={style.actionLink}>🛒 Купити зараз</button>
        <button className={style.actionLink}>❓ Є питання?</button>
      </div>
    </div>
  );
};

export default ProductCard;
