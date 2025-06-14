'use client';

import React from 'react';
import Image from 'next/image';
import { UseFormRegisterReturn, FieldError } from 'react-hook-form';

import style from './productForm.module.css';

interface ProductImageInputProps {
  register: UseFormRegisterReturn<string>;
  errors?: FieldError;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  previewUrl: string | null;
  label: string;
}

const ProductImageInput: React.FC<ProductImageInputProps> = ({
  register,
  errors,
  onChange,
  previewUrl,
  label,
}) => {
  return (
    <div className={style.inputContainer}>
      <label className={style.label}>{label}</label>
      <input
        className={style.input}
        type="file"
        {...register}
        onChange={onChange}
      />
      {errors && <p className={style.error}>{errors.message}</p>}
      {previewUrl && (
        <Image
          src={previewUrl}
          alt="Preview"
          className={style.img}
          width={200}
          height={200}
        />
      )}
    </div>
  );
};

export default ProductImageInput;
