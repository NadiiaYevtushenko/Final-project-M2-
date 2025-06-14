import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getProductsByCategory,
  getProductsBySubCategory,
  getProductByID,
} from '../../app/admin/api/productsDB';
import type { ProductState } from '../../app/helpers/typings';

export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchByCategory',
  async (category: string, thunkAPI) => {
    try {
      const data = await getProductsByCategory(category);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const fetchProductsBySubCategory = createAsyncThunk(
  'products/fetchBySubCategory',
  async (subCategory: string, thunkAPI) => {
    try {
      const data = await getProductsBySubCategory(subCategory);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const fetchProductByID = createAsyncThunk(
  'products/fetchByID',
  async (productId: string, thunkAPI) => {
    try {
      const data = await getProductByID(productId);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const fetchCategoryIfNeeded = createAsyncThunk(
  'products/fetchCategoryIfNeeded',
  async (category: string, { getState, dispatch }) => {
    const state = getState() as { products: ProductState };

    if (state.products.loadedCategories.includes(category)) {
      return { category, products: null };
    }

    const products = await dispatch(fetchProductsByCategory(category)).unwrap();
    return { category, products };
  }
);

export const fetchSubCategoryIfNeeded = createAsyncThunk(
  'products/fetchSubCategoryIfNeeded',
  async (subCategory: string, { getState, dispatch }) => {
    const state = getState() as { products: ProductState };

    if (state.products.loadedSubCategories.includes(subCategory)) {
      return { subCategory, products: null };
    }

    const products = await dispatch(
      fetchProductsBySubCategory(subCategory)
    ).unwrap();
    return { subCategory, products };
  }
);
