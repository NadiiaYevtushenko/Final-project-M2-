import { useNavigate } from 'react-router';
import styles from './Profile.module.css';

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.profileWrapper}>
      <h1 className={styles.title}>Особистий кабінет</h1>
      <div className={styles.buttonGroup}>
        <button className={styles.button} onClick={() => navigate('/orders')}>
          Історія замовлень (в розробці)
        </button>
        <button className={styles.button} disabled>
          Змінити пароль (в розробці)
        </button>
        <button className={styles.button} disabled>
          Контактна інформація  (в розробці)
        </button>
      </div>
    </div>
  );
};

export default Profile;
