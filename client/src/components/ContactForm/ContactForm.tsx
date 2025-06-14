import { useState, useEffect } from 'react';
import type { ChangeEvent, FormEvent} from 'react';
import { useAppDispatch, useAppSelector } from '../../app/useAppDispatch';
import { sendContactForm, resetStatus } from '../../app/contactSlice';
import type { ContactFormData } from '../../app/helpers/typings.d';

import style from './contactForm.module.css';

const ContactForm = () => {
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector((state) => state.contact);

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(sendContactForm(formData));
  };

  useEffect(() => {
    return () => {
      dispatch(resetStatus());
    };
  }, [dispatch]);

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

      <label htmlFor="phone" className="visually-hidden">Телефон</label>
      <input
        id="phone"
        name="phone"
        type="tel"
        className={style.input}
        placeholder="+380..."
        value={formData.phone}
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
