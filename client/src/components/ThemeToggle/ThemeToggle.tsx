'use client';

import React, { useState } from 'react';

import { lightTheme, darkTheme } from '../../app/theme';
import type { Theme } from '../../app/theme';

import style from './ThemeToggle.module.css';

interface ThemeToggleProps {
  onChangeTheme: (theme: Theme) => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ onChangeTheme }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? lightTheme : darkTheme;
    setIsDarkMode(!isDarkMode);
    onChangeTheme(newTheme);
  };

  return (
    <button className={style.toggleButton} onClick={toggleTheme}>
      {isDarkMode ? 'Світла тема' : 'Темна тема'}
    </button>
  );
};

export default ThemeToggle;
