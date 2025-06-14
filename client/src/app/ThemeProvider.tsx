import React, {useEffect, useState } from 'react';
import type { ReactNode } from 'react';


import { darkTheme } from './theme';
import type { Theme } from './theme';
import ThemeToggle from '../components/ThemeToggle/ThemeToggle';

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(darkTheme);

  useEffect(() => {
    for (const key in theme) {
      const themeKey = key as keyof Theme;
      document.documentElement.style.setProperty(`--${themeKey}`, theme[themeKey]);
    }
  }, [theme]);

  const changeTheme = (newTheme: Theme) => setTheme(newTheme);

  return (
    <>
      <ThemeToggle onChangeTheme={changeTheme} />
      {children}
    </>
  );
};

export default ThemeProvider;
