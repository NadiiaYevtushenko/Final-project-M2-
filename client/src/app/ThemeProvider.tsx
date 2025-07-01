import React, { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import Cookies from 'js-cookie'; // ✅ для роботи с cookie

import { lightTheme, darkTheme } from './theme';
import type { Theme } from './theme';
import ThemeToggle from '../components/ThemeToggle/ThemeToggle';

interface ThemeProviderProps {
  children: ReactNode;
}

// Допоміжна функція: визначити тему з cookie
const getInitialTheme = (): Theme => {
  const savedTheme = Cookies.get('theme');

  if (savedTheme === 'light') return lightTheme;
  if (savedTheme === 'dark') return darkTheme;

  // fallback (нічна тема)
  return darkTheme;
};

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  // 🔹 Застосування CSS-змінних
  useEffect(() => {
    for (const key in theme) {
      const themeKey = key as keyof Theme;
      document.documentElement.style.setProperty(`--${themeKey}`, theme[themeKey]);
    }

    // 🔹 Зберегти cookie
    const themeName = theme === lightTheme ? 'light' : 'dark';
    Cookies.set('theme', themeName, { expires: 30 });

    // 🔹 Синхронізація з Express-сервером
    fetch('http://localhost:5000/set-theme', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ theme: themeName }),
    }).catch((err) => {
      console.warn('Не вдалося синхронізувати тему з сервером:', err.message);
    });
  }, [theme]);

  // 🔹 Зміна теми
  const changeTheme = (newTheme: Theme) => setTheme(newTheme);

  return (
    <>
      <ThemeToggle onChangeTheme={changeTheme} />
      {children}
    </>
  );
};

export default ThemeProvider;
