'use client';

import React, { useState } from 'react';
import {
  useForm,
  useFieldArray,
  SubmitHandler,
  FieldErrors,
} from 'react-hook-form';

import ProductNameInput from './ProductNameInput';
import ProductImageInput from './ProductImageInput';
import ProductDescriptionInput from './ProductDescriptionInput';
import CategorySelect from './CategorySelect';
import SimpleProduct from './SimpleProduct';
import VariationInput from './VariationInput';
import { addProduct } from '@/app/admin/api/productsDB';
import FormData from '@/app/helpers/typings';
import style from './productForm.module.css';

const ProductForm: React.FC = () => {
  const [subCategories, setSubCategories] = useState<string[]>([]);
  const [productImagePreview, setProductImagePreview] = useState<string | null>(
    null
  );
  const [galleryImagePreviews, setGalleryImagePreviews] = useState<string[]>(
    []
  );
  const [numOfVariations, setNumOfVariations] = useState(0);
  const [variationNames, setVariationNames] = useState<string[]>([]);
  const [isNameVariations, setIsNameVariation] = useState(false);
  const [countArticle, setCountArticle] = useState<number>(0);
  const [imgFileGallery, setImgFileGallery] = useState<File[]>([]);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      productName: '',
      shortDescription: '',
      productDescription: '',
      category: '',
      subCategory: '',
      productType: 'simple',
      price: null,
      availability: 'available',
      sku: '',
      productImage: null,
      galleryImages: [{ image: null }],
      variations: [],
    },
  });

  const {
    fields: galleryFields,
    append: appendGalleryImage,
    remove: removeGalleryImage,
  } = useFieldArray({
    control,
    name: 'galleryImages',
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await addProduct(data);
      alert('Продукт успішно завантажено');
      reset();
      setProductImagePreview(null);
      setGalleryImagePreviews([]);
      setSubCategories([]);
      setNumOfVariations(0);
      setVariationNames([]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    switch (category) {
      case 'drone':
        setSubCategories(['10 Дюймів', '7 Дюймів']);
        break;
      case 'antenna-relay-stations':
        setSubCategories(['Антени', 'Ретранслятори']);
        break;
      default:
        setSubCategories([]);
    }
  };

  const handleProductImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | null = e.target.files?.[0] ?? null;
    if (file) {
      setProductImagePreview(URL.createObjectURL(file));
    }
  };

  const handleGalleryImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file: File | null = e.target.files?.[0] ?? null;
    const currentFiles = imgFileGallery ? [...imgFileGallery] : [];
    if (file) {
      currentFiles[index] = file;
      setImgFileGallery(currentFiles);
      const newPreviews = [...galleryImagePreviews];
      newPreviews[index] = URL.createObjectURL(file);
      setGalleryImagePreviews(newPreviews);
    }
  };

  const handleRemoveGalleryImage = (index: number) => {
    const currentFiles = [...imgFileGallery];
    currentFiles.splice(index, 1);
    setImgFileGallery(currentFiles);
    const newPreviews = [...galleryImagePreviews];
    newPreviews.splice(index, 1);
    setGalleryImagePreviews(newPreviews);
    removeGalleryImage(index);
  };

  const getErrorMessage = (error: any) => {
    if (error) {
      return typeof error === 'string' ? error : error.message;
    }
    return null;
  };

  const watchProductType = watch('productType', 'simple');

  const addVariation = () => {
    setCountArticle(countArticle + 1);
  };

  const removeVariation = (index: number) => {
    const currentVariations = getValues('variations');
    currentVariations.splice(index, 1);
    setValue('variations', currentVariations);
    setCountArticle(countArticle - 1);
  };

  return (
    <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
      <ProductNameInput register={register} errors={errors} />

      <ProductImageInput
        register={register('productImage', {
          required: 'Завантажте зображення товару',
        })}
        errors={errors.productImage}
        onChange={handleProductImageChange}
        previewUrl={productImagePreview}
        label="Зображення товару"
      />

      <div className={style.galeryInputContainer}>
        <label className={style.label}>Галерея товару</label>
        <div>
          {galleryFields.map((field, index) => (
            <div key={field.id} className={style.galleryItem}>
              <ProductImageInput
                register={register(`galleryImages.${index}.image`)}
                errors={errors.galleryImages?.[index]?.image}
                onChange={(e) => handleGalleryImageChange(e, index)}
                previewUrl={galleryImagePreviews[index]}
                label={`Зображення галереї товару ${index + 1}`}
              />
              <button
                type="button"
                className={style.buttonDell}
                onClick={() => handleRemoveGalleryImage(index)}
              >
                Видалити
              </button>
            </div>
          ))}
        </div>
      </div>
      <button
        className={style.button}
        type="button"
        onClick={() => appendGalleryImage({ image: null })}
      >
        Додати ще зображення
      </button>

      <ProductDescriptionInput
        label="Короткий опис товару"
        register={register('shortDescription', {
          required: 'Введіть опис',
        })}
        errors={errors.shortDescription}
      />

      <ProductDescriptionInput
        label="Опис товару"
        register={register('productDescription', {
          required: 'Введіть опис',
        })}
        errors={errors.productDescription}
      />

      <CategorySelect
        register={register}
        errors={errors}
        subCategories={subCategories}
        handleCategoryChange={handleCategoryChange}
      />

      <div className={style.inputContainer}>
        <label className={style.label}>Тип товару</label>
        <select {...register('productType')}>
          <option value="simple">Звичайний товар</option>
          <option value="variable">Варіативний товар</option>
        </select>
        {errors.productType && (
          <p className={style.error}>{getErrorMessage(errors.productType)}</p>
        )}
      </div>

      {watchProductType === 'simple' ? (
        <SimpleProduct
          register={register}
          errors={errors as FieldErrors<FormData>}
          getErrorMessage={getErrorMessage}
        />
      ) : (
        <>
          <div className={style.inputContainer}>
            <label className={style.label}>
              Кількість нестандартних інпутів
            </label>
            <input
              type="number"
              className={style.input}
              value={numOfVariations}
              onChange={(e) => setNumOfVariations(parseInt(e.target.value))}
            />
          </div>

          {numOfVariations > 0 && (
            <>
              {Array.from({ length: numOfVariations }).map((_, index) => (
                <div key={index} className={style.inputContainer}>
                  <label className={style.label}>Назва поля {index + 1}</label>
                  <input
                    type="text"
                    className={style.input}
                    value={variationNames[index] || ''}
                    onChange={(e) => {
                      const newNames = [...variationNames];
                      newNames[index] = e.target.value;
                      setVariationNames(newNames);
                    }}
                  />
                </div>
              ))}
              <button
                className={style.button}
                type="button"
                onClick={() => setIsNameVariation(true)}
              >
                Підтвердити назви полів
              </button>
              <div className={style.blokContainer}>
                {isNameVariations && (
                  <>
                    {Array.from(Array(countArticle), (e, i) => (
                      <div key={i}>
                        <VariationInput
                          index={i}
                          namesList={variationNames}
                          register={register}
                          errors={errors as FieldErrors<FormData>}
                        />
                        <button
                          className={style.button}
                          type="button"
                          onClick={() => removeVariation(i)}
                        >
                          Видалити
                        </button>
                        <div className={style.divider}></div>
                      </div>
                    ))}
                    <button
                      className={style.button}
                      type="button"
                      onClick={addVariation}
                    >
                      Додати варіацію товару
                    </button>
                  </>
                )}
              </div>
            </>
          )}
        </>
      )}
      <button className={style.button} type="submit">
        Завантажити товар
      </button>
    </form>
  );
};

export default ProductForm;
