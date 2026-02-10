// src/store/index.js
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'   // ← must point to your slice file

export const store = configureStore({
  reducer: {
    counter: counterReducer
  }
})