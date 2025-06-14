'use client';

import React from 'react';
import { FieldError } from 'react-hook-form';

import SimpleProduct from './SimpleProduct';
import style from './productForm.module.css';

interface VariationInputProps {
  index: number;
  namesList: string[];
  register: any;
  errors: any;
}

const VariationInput: React.FC<VariationInputProps> = ({
  index,
  namesList,
  register,
  errors,
}) => {
  const getErrorMessage = (error: FieldError | undefined) => {
    return error ? error.message || 'Error' : null;
  };

  return (
    <div>
      {namesList.map((name) => (
        <div className={style.inputContainer} key={name}>
          <label className={style.label}>{name}</label>
          <input
            className={style.input}
            type="text"
            {...register(`variations[${index}].${name}` as const, {
              required: 'Введіть значення',
            })}
          />
          {errors.variations?.[index]?.[name] && (
            <p className={style.error}>
              {getErrorMessage(errors.variations[index][name] as FieldError)}
            </p>
          )}
        </div>
      ))}
      <SimpleProduct
        register={(fieldName: any) =>
          register(`variations[${index}].${fieldName}` as const)
        }
        errors={errors}
        getErrorMessage={getErrorMessage}
      />
    </div>
  );
};

export default VariationInput;
