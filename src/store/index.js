import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import { postsApi } from './api/postsApi';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [postsApi.reducerPath]: postsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postsApi.middleware),
});