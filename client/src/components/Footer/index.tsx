import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router';

import headerNavLinks from '../../app/data/headerNavLinks';
import Logo from '../../components/Logo/Logo';
import cube from '@/assets/cube_1.png';
import style from './footer.module.css';

const Footer = () => {
  const cubeRef = useRef<HTMLImageElement | null>(null);
  const [menuOpenFooter, setMenuOpenFooter] = useState(false);

  const toggleMenu = () => {
    setMenuOpenFooter((prev) => !prev);
  };

  useEffect(() => {
    const cube = cubeRef.current;

    const handleMouseEnter = () => {
      if (cube && !cube.classList.contains(style.animate)) {
        cube.classList.add(style.animate);
      }
    };

    const handleAnimationEnd = () => {
      cube?.classList.remove(style.animate);
    };

    cube?.addEventListener('mouseenter', handleMouseEnter);
    cube?.addEventListener('animationend', handleAnimationEnd);

    return () => {
      cube?.removeEventListener('mouseenter', handleMouseEnter);
      cube?.removeEventListener('animationend', handleAnimationEnd);
    };
  }, []);

  return (
    <footer className={style.footer}>
      <nav className={style.container}>
        <div>
          <Link to="/" aria-label="Main page">
            <div className={style.footerLogo}>
              <div className={style.logoContainer}>
                <Logo />
              </div>
            </div>
          </Link>
        </div>

        <ul className={style.navLinks}>
          {headerNavLinks.map((link) => (
            <li key={link.title}>
              <Link to={link.href} className={style.navLink}>
                <span>{link.title}</span>
                <span className={style.spanLink}></span>
              </Link>
            </li>
          ))}
        </ul>

        <div className={style.navLinksMobile}>
          <div
            onClick={toggleMenu}
            className={`${style.menuIcon} ${
              menuOpenFooter ? style.rotateClose : style.rotateOpen
            }`}
          >
            <FontAwesomeIcon
              icon={menuOpenFooter ? faXmark : faBars}
              size="2xl"
              style={{ color: '#8e8001' }}
            />
          </div>

          {menuOpenFooter && (
            <ul
              className={`${style.ulLinksMobile} ${
                menuOpenFooter ? style.menuOpenFooter : style.menuCloseFooter
              }`}
            >
              {headerNavLinks.map((link) => (
                <li key={link.title}>
                  <Link
                    to={link.href}
                    className={style.navLink}
                    onClick={toggleMenu}
                  >
                    <span>{link.title}</span>
                    <span className={style.spanLink}></span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={style.cubeBox}>
          <img
            src={cube}
            alt="Ілюстративне фото куба"
            width={60}
            height={60}
            className={style.cube}
            ref={cubeRef}
          />
        </div>
      </nav>
    </footer>
  );
};

export default Footer;