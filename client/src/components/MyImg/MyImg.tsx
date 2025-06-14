import React from 'react';

import style from './myImg.module.css';

interface MyImgProps {
  imgSrc: string;
  alt: string;
  width: number;
  height: number;
}

const MyImg: React.FC<MyImgProps> = ({ imgSrc, alt, width, height }) => {
  return (
    <img
      src={imgSrc}
      alt={alt}
      className={style.img}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
    />
  );
};

export default MyImg;
