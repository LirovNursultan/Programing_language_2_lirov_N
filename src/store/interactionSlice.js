import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  likes: {},        // { postId: true/false }
  favorites: {},    // { postId: true/false }
  ratings: {},      // { postId: [4, 5, 3, ...] }
};

const interactionSlice = createSlice({
  name: 'interactions',
  initialState,
  reducers: {
    // 1. Like
    toggleLike: (state, action) => {
      const postId = action.payload;
      state.likes[postId] = !state.likes[postId];
    },

    // 2. Избранное
    toggleFavorite: (state, action) => {
      const postId = action.payload;
      state.favorites[postId] = !state.favorites[postId];
    },

    // 3. Добавить оценку
    addRating: (state, action) => {
      const { postId, rating } = action.payload; // rating от 1 до 5
      if (!state.ratings[postId]) state.ratings[postId] = [];
      state.ratings[postId].push(rating);
    },
  },
});

export const { toggleLike, toggleFavorite, addRating } = interactionSlice.actions;
export default interactionSlice.reducer;