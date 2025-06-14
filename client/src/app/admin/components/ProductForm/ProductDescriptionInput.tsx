'use client ';

import React from 'react';
import { UseFormRegisterReturn, FieldError } from 'react-hook-form';

import style from './productForm.module.css';

interface ProductDescriptionInputProps {
  register: UseFormRegisterReturn<string>;
  errors?: FieldError;
  label: string;
}

const ProductDescriptionInput: React.FC<ProductDescriptionInputProps> = ({
  register,
  errors,
  label,
}) => {
  return (
    <div className={style.inputContainer}>
      <label className={style.label}>{label}</label>
      <textarea className={style.input} {...register} spellCheck="true" />
      {errors && <p className={style.error}>{errors.message}</p>}
    </div>
  );
};

export default ProductDescriptionInput;
