import { useState } from 'react';
import style from '../PasswordRecovery/loginForm.module.css';

const ForgotPasswordModal = ({ onClose }: { onClose: () => void }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/users/api/forgot-password', {
        method: 'POST',
        credentials: 'include',  // ✅ додано для передачі cookie з JWT
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const contentType = res.headers.get('content-type');
      if (!contentType?.includes('application/json')) {
        const raw = await res.text();
        throw new Error('Сервер повернув некоректну відповідь: ' + raw.slice(0, 100));
      }

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Помилка запиту');
      }

      setMessage(data.message || 'Перевірте пошту для подальших інструкцій');
      setError('');
    } catch (err: any) {
      setMessage('');
      setError(err.message || 'Сталася невідома помилка');
    }
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
        {error && <div className={style.error}>{error}</div>}
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
