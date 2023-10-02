import { configureStore } from '@reduxjs/toolkit';
import { serviceMiddlewares, serviceReducers } from 'services';
import languageSlice from './slices/languageSlice';

const store = configureStore({
  reducer: {
    language: languageSlice,
    ...serviceReducers,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(serviceMiddlewares),
});

export default store;
