'use client';

import React from 'react';
import { FieldErrors } from 'react-hook-form';

import FormData from '@/app/helpers/typings';
import { categories } from '@/app/data/categories';
import style from './productForm.module.css';

interface CategorySelectProps {
  register: any;
  errors: FieldErrors<FormData>;
  subCategories: string[];
  handleCategoryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CategorySelect: React.FC<CategorySelectProps> = ({
  register,
  errors,
  subCategories,
  handleCategoryChange,
}) => {
  const getErrorMessage = (error: any) => {
    if (error) {
      return typeof error === 'string' ? error : error.message;
    }
    return null;
  };

  return (
    <div className={style.inputContainer}>
      <label className={style.label}>Категорія</label>
      <select
        {...register('category', { required: 'Виберіть категорію' })}
        onChange={handleCategoryChange}
      >
        {categories.map((category) => (
          <option key={category.value} value={category.value}>
            {category.label}
          </option>
        ))}
      </select>
      {errors.category && (
        <p className={style.error}>{getErrorMessage(errors.category)}</p>
      )}

      {subCategories.length > 0 && (
        <>
          <label className={style.label}>Підкатегорія</label>
          <select {...register('subCategory')}>
            <option value="">Виберіть підкатегорію</option>
            {subCategories.map((subCategory) => (
              <option key={subCategory} value={subCategory}>
                {subCategory}
              </option>
            ))}
          </select>
        </>
      )}
    </div>
  );
};

export default CategorySelect;
