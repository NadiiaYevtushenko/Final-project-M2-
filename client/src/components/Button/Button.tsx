import React from 'react';
import { useNavigate } from 'react-router';

import style from './button.module.css';

interface ButtonProps {
  buttonText: string;
  redirectPath: string;
}

const Button: React.FC<ButtonProps> = ({ buttonText, redirectPath }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(redirectPath);
  };

  return (
    <button className={style.button} onClick={handleClick}>
      {buttonText}
    </button>
  );
};

export default Button;
