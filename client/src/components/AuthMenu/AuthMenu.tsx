import { useState } from 'react';
import { Link } from 'react-router';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { useAuth } from '../../app/AuthContext';
import style from './AuthMenu.module.css';
import RegisterModal from '../../app/admin/components/RegisterForm/RegisterModal';
import LoginModal from '../../app/admin/components/LoginForm/LoginModal';

const AuthMenu = () => {
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    setOpen(false);
  };

  const handleRegisterSuccess = () => {
    setShowRegisterModal(false);
    setOpen(false);
  };

  return (
    <>
      <div className={style.authBox}>
        <button
          className={style.authButton}
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Auth menu"
        >
          <PersonOutlineOutlinedIcon sx={{ fontSize: 40, color: '#8e8001' }} />
        </button>

        {open && (
          <div className={style.authDropdown}>
            {!isAuthenticated ? (
              <>
                <button
                  className={style.dropdownItem}
                  onClick={() => {
                    setOpen(false);
                    setShowLoginModal(true);
                  }}
                >
                  Вхід
                </button>
                <button
                  className={style.dropdownItem}
                  onClick={() => {
                    setOpen(false);
                    setShowRegisterModal(true);
                  }}
                >
                  Реєстрація
                </button>
              </>
            ) : (
              <>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className={style.dropdownItem}
                    onClick={() => setOpen(false)}
                  >
                    Адмінка (на розробці)
                  </Link>
                )}
                <Link
                  to="/profile"
                  className={style.dropdownItem}
                  onClick={() => setOpen(false)}
                >
                  Особистий кабінет
                </Link>
                <button
                  className={style.dropdownItem}
                  onClick={() => {
                    setOpen(false);
                    logout();
                  }}
                >
                  Вийти
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {showRegisterModal && (
        <RegisterModal
          onClose={() => setShowRegisterModal(false)}
          onSuccess={handleRegisterSuccess}
        />
      )}

      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onSuccess={handleLoginSuccess}
        />
      )}
    </>
  );
};

export default AuthMenu;
