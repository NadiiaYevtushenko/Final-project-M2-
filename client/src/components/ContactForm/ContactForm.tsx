import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import style from './contactForm.module.css';

type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const ContactForm = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'succeeded' | 'failed'>('idle');
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setError(null);

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);

      setStatus('succeeded');
      setFormData({ name: '', email: '', message: '' });
    } catch (err: any) {
      console.error('❌ Contact form error:', err);
      setStatus('failed');
      setError(err.message || 'Невідома помилка');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <label htmlFor="name" className="visually-hidden">Ім’я</label>
      <input
        id="name"
        name="name"
        type="text"
        className={style.input}
        placeholder="Ім’я"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <label htmlFor="email" className="visually-hidden">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        className={style.input}
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <label htmlFor="message" className="visually-hidden">Повідомлення</label>
      <textarea
        id="message"
        name="message"
        className={style.input}
        placeholder="Що вас цікавить?"
        value={formData.message}
        onChange={handleChange}
        required
      />

      <button
        type="submit"
        className={style.button}
        disabled={status === 'loading'}
      >
        {status === 'loading' ? 'Надсилаємо...' : 'Надіслати'}
      </button>

      {status === 'succeeded' && (
        <p className={style.successMessage}>Повідомлення успішно надіслано!</p>
      )}
      {status === 'failed' && (
        <p className={style.errorMessage}>Помилка: {error}</p>
      )}
    </form>
  );
};

export default ContactForm;
