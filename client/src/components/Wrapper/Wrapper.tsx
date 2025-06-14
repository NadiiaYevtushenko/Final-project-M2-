import React from 'react';
import type { ReactNode } from 'react';

import style from './wrapper.module.css';

interface WrapperProps {
  children: ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return <div className={style.containerWrapper}>{children}</div>;
};

export default Wrapper;
