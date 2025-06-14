import { configureStore } from '@reduxjs/toolkit';
import contactReducer from '../app/contactSlice'; 
import { useDispatch, useSelector, useStore as useReduxStore } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import cartReducer from '../features/cart/cartSlice';
import productsReducer from '../features/products/productsSlice';

export const store = configureStore({
  reducer: {
    contact: contactReducer,       
    products: productsReducer,
    cart: cartReducer
  }
})

// Типи
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

// Хуки з типами
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore: () => AppStore = useReduxStore;

export default store;
