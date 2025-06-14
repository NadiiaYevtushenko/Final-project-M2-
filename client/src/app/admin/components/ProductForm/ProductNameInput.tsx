'use client';

import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';

import style from './productForm.module.css';

interface ProductNameInputProps {
  register: UseFormRegister<any>;
  errors: FieldErrors;
}

const ProductNameInput: React.FC<ProductNameInputProps> = ({
  register,
  errors,
}) => {
  const errorMessage = errors.productName?.message;

  return (
    <div className={style.inputContainer}>
      <label className={style.label}>Назва товару</label>
      <input
        className={style.input}
        {...register('productName', {
          required: 'Введіть товар',
        })}
      />
      {errorMessage && typeof errorMessage === 'string' && (
        <p className={style.error}>{errorMessage}</p>
      )}
    </div>
  );
};

export default ProductNameInput;
