import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { ContactFormData } from '../app/helpers/typings.d';

interface ContactState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ContactState = {
  status: 'idle',
  error: null,
};

// Async thunk для надсилання контактної форми
export const sendContactForm = createAsyncThunk<
  void, // немає поверненого значення
  ContactFormData, // payload (дані форми)
  { rejectValue: string } // тип помилки
>(
  'contact/sendContactForm',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        return rejectWithValue('Не вдалося надіслати форму');
      }
    } catch (error) {
      return rejectWithValue('Серверна помилка');
    }
  }
);

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendContactForm.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(sendContactForm.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(sendContactForm.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Невідома помилка';
      });
  },
});

export const { resetStatus } = contactSlice.actions;
export default contactSlice.reducer;
