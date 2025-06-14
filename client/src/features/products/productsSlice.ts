import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { ProductState } from '../../app/helpers/typings'; 

import {
  fetchCategoryIfNeeded,
  fetchSubCategoryIfNeeded,
} from './goods';

const initialState: ProductState = {
  items: [],
  loadedCategories: [],
  loadedSubCategories: [],
  currentCategory: null,
  currentSubCategory: null,
  selectedProduct: null,
  status: 'idle',
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<string>) {
      state.currentCategory = action.payload;
    },
    setSubCategory(state, action: PayloadAction<string | null>) {
      state.currentSubCategory = action.payload;
    },
    selectProductById(state, action: PayloadAction<string>) {
      const found = state.items.find((item) => item.id === action.payload);
      state.selectedProduct = found ?? null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchCategoryIfNeeded
      .addCase(fetchCategoryIfNeeded.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCategoryIfNeeded.fulfilled, (state, { payload }) => {
        const { category, products } = payload;
        if (products) {
          state.items.push(...products);
          state.loadedCategories.push(category);
          state.currentCategory = category;
        }
        state.status = 'succeeded';
      })
      .addCase(fetchCategoryIfNeeded.rejected, (state, { error }) => {
        state.status = 'failed';
        state.error = error.message ?? 'Failed to load category';
      })

      // fetchSubCategoryIfNeeded
      .addCase(fetchSubCategoryIfNeeded.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchSubCategoryIfNeeded.fulfilled, (state, { payload }) => {
        const { subCategory, products } = payload;
        if (products) {
          state.items.push(...products);
          state.loadedSubCategories.push(subCategory);
          state.currentSubCategory = subCategory;
        }
        state.status = 'succeeded';
      })
      .addCase(fetchSubCategoryIfNeeded.rejected, (state, { error }) => {
        state.status = 'failed';
        state.error = error.message ?? 'Failed to load subcategory';
      });
  },
});

export const {
  setCategory,
  setSubCategory,
  selectProductById,
} = productsSlice.actions;

export default productsSlice.reducer;
