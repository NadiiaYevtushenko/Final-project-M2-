'use client';

import React from 'react';

import style from './productForm.module.css';

interface SimpleProductProps {
  register: any;
  errors: any;
  getErrorMessage: (error: any) => string | null;
}

const SimpleProduct: React.FC<SimpleProductProps> = ({
  register,
  errors,
  getErrorMessage,
}) => {
  return (
    <>
      <div className={style.inputContainer}>
        <label className={style.label}>Ціна</label>
        <input className={style.input} type="number" {...register('price')} />
        {errors.price && (
          <p className={style.error}>{getErrorMessage(errors.price)}</p>
        )}
      </div>
      <div className={style.inputContainer}>
        <label className={style.label}>Артикул</label>
        <input
          className={style.input}
          type="text"
          {...register('sku' as const, {
            required: 'Введіть артикул',
          })}
        />
        {errors.sku && (
          <p className={style.error}>{getErrorMessage(errors.sku)}</p>
        )}
      </div>

      <div className={style.inputContainer}>
        <label className={style.label}>Наявність</label>
        <select {...register('availability' as const)}>
          <option value="Є в наявності">Є в наявності</option>
          <option value="Доступно за замовленням">
            Доступно за замовленням
          </option>
          <option value="Нема в наявності">Нема в наявності</option>
        </select>
      </div>
    </>
  );
};

export default SimpleProduct;
