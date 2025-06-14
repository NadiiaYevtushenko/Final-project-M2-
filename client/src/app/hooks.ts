import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// типізований dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();

// типізований selector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
