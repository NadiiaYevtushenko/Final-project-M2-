import { Link } from 'react-router';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import style from './header.module.css';

const CartMenu = () => {
  const cartItemsCount = useSelector((state: RootState) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  return (
    <div className={style.cartBox}>
      <Link to="/shop/cart" aria-label="Cart" className={style.cartLink}>
        <ShoppingBasketOutlinedIcon sx={{ color: '#8e8001', fontSize: 40 }} />
        {cartItemsCount > 0 && (
          <span className={style.cartBadge}>{cartItemsCount}</span>
        )}
      </Link>
    </div>
  );
};

export default CartMenu;
