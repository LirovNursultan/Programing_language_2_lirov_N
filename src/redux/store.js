import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import authReducer from './slices/authSlice';
import todoReducer from './slices/todoSlice';
import interactionReducer from './slices/interactionSlice';
import { postsApi } from '../services/postsApi';

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
