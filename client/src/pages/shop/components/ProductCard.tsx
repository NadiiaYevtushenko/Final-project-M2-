import { Link } from 'react-router'; 
import style from './ProductCard.module.css'; // правильний шлях

type ProductCardProps = {
  id: string;
  title: string;
  brand: string;
  model: string;
  price: number;
  oldPrice?: number;
  image: string;
  discountPercent?: number;
  categorySlug: string;
  slug: string;
};

const ProductCard = ({
  id,
  title,
  brand,
  model,
  price,
  oldPrice,
  image,
  discountPercent,
  categorySlug,
  slug,
}: ProductCardProps) => (
  <div className={style.card}>
    <div className={style.topRow}>
      {discountPercent && <span className={style.discount}>-{discountPercent}%</span>}
    </div>

    <Link to={`/shop/${categorySlug}/${slug}`}>
      <img src={`http://localhost:5000${image}`} alt={title} className={style.image} />
    </Link>

    <p className={style.brand}>{brand} {model}</p>
    <h3 className={style.title}>{title}</h3>

    <div className={style.priceSection}>
      <span className={style.price}>{price} zł</span>
      {oldPrice && <span className={style.oldPrice}>{oldPrice} zł</span>}
    </div>

    <button className={style.buyButton}>Купити</button>
  </div>
);

export default ProductCard;
