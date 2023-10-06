import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  language: 'eng',
};

const languageSlice = createSlice({
  name: 'setup',
  initialState,
  reducers: {
    setLanguage: (state, action) => ({ ...state, language: action.payload }),
  },
});

export default languageSlice.reducer;

export const { setLanguage } = languageSlice.actions;
