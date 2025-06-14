'use client';

import React, { useState, FormEvent } from 'react';

import { changePassword } from '@/app/admin/api/auth';
import style from '../LoginForm/loginForm.module.css';

const ChangPasswordForm: React.FC = () => {
  const [password, setPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const user = await changePassword(password, newPassword);
      setPassword('');
      setNewPassword('');
      alert('Ви успішно змінили пароль)');
    } catch (error) {
      console.error('Помилка входу', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={style.formContainer}>
      <p className={style.text}>
        Щоб змінити пароль спочатку зайдіть в адмінку за допомогою форми вище,
        потім введіть старий та новий паролі
      </p>
      <div>
        <label htmlFor="password" className={style.label}>
          Старий пароль:
        </label>
        <input
          type="password"
          id="oldPassword"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={style.input}
        />
      </div>
      <div>
        <label htmlFor="newPassword" className={style.label}>
          Новий пароль:
        </label>
        <input
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          className={style.input}
        />
      </div>
      <button type="submit" className={style.button}>
        Змінити пароль
      </button>
    </form>
  );
};

export default ChangPasswordForm;
