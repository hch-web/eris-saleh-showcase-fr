import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  language: 'eng',
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action) => ({ ...state, language: action.payload }),
  },
});

export default languageSlice.reducer;

export const { setLanguage } = languageSlice.actions;
