import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import authReducer from './authSlice';
import todoReducer from './todoSlice';
import interactionReducer from './interactionSlice';
import { postsApi } from './api/postsApi';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    todos: todoReducer,
    interactions: interactionReducer,
    [postsApi.reducerPath]: postsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postsApi.middleware),
});