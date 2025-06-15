import { useState } from 'react';
import style from '../PasswordRecovery/loginForm.module.css';

const ForgotPasswordModal = ({ onClose }: { onClose: () => void }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('http://localhost:5000/users/api/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <div className={style.modalOverlay}>
      <div className={style.modal}>
        <button onClick={onClose} className={style.closeBtn} aria-label="Закрити">×</button>
        <h2 className={style.sectionTitle}>Відновлення пароля</h2>
        <form onSubmit={handleSubmit}>
          <input
            className={style.input}
            type="email"
            placeholder="Введіть ваш email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className={style.submitBtn}>Надіслати</button>
        </form>
        {message && <div className={style.confirmMessage}>{message}</div>}
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
