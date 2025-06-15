import { useState } from 'react';
import { Provider } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router';
import CartMenu from './cartMenu';
import headerNavLinks from '../../app/data/headerNavLinks';
import Logo from '../../components/Logo/Logo';
import AuthMenu from '../../components/AuthMenu/AuthMenu';
import store from '../../app/store';
import style from './header.module.css';
import { useAuth } from '../../app/AuthContext'; // ⬅️ додаємо

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { isAuthenticated, user } = useAuth(); // ⬅️ читаємо firstName

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <Provider store={store}>
      <header className={style.header}>
        <nav className={style.container}>
          {/* Logo */}
          <Link to="/" aria-label="Main page">
            <div className={style.headerLogo}>
              <div className={style.logoContainer}>
                <Logo />
              </div>
            </div>
          </Link>

          {/* Desktop навігація */}
          <div className={style.navLinks}>
            <ul className={style.ulLinks}>
              {headerNavLinks.map((link) => (
                <li key={link.title}>
                  <Link to={link.href} className={style.navLink}>
                    <span>{link.title}</span>
                    <span className={style.spanLink}></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Пошук */}
          <div className={style.searchBox}>
            <input
              type="text"
              placeholder="Пошук товарів..."
              className={style.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Вітання + Кошик + Auth */}
          <div className={style.headerRight}>
            {isAuthenticated && user?.firstName && (
              <div className={style.greetingText}>👋 Вітаю, {user.firstName}!</div>
            )}
            <CartMenu />
            <AuthMenu />
          </div>

          {/* Mobile меню */}
          <div className={style.navLinksMobile}>
            <div
              onClick={toggleMenu}
              className={`${style.menuIcon} ${menuOpen ? style.rotateClose : style.rotateOpen}`}
            >
              <FontAwesomeIcon
                icon={menuOpen ? faXmark : faBars}
                size="2xl"
                style={{ color: '#8e8001' }}
              />
            </div>

            {menuOpen && (
              <ul className={`${style.ulLinksMobile} ${menuOpen ? style.menuOpen : style.menuClose}`}>
                {headerNavLinks.map((link) => (
                  <li key={link.title}>
                    <Link to={link.href} className={style.navLink} onClick={toggleMenu}>
                      <span>{link.title}</span>
                      <span className={style.spanLink}></span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </nav>
      </header>
    </Provider>
  );
};

export default Header;
