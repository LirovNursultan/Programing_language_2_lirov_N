import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  likes: {},
  favorites: {},
  ratings: {},
};

const interactionSlice = createSlice({
  name: 'interactions',
  initialState,
  reducers: {
    toggleLike: (state, action) => {
      const postId = action.payload;
      state.likes[postId] = !state.likes[postId];
    },
    toggleFavorite: (state, action) => {
      const postId = action.payload;
      state.favorites[postId] = !state.favorites[postId];
    },
    addRating: (state, action) => {
      const { postId, rating } = action.payload;
      if (!state.ratings[postId]) state.ratings[postId] = [];
      state.ratings[postId].push(rating);
    },
  },
});

export const { toggleLike, toggleFavorite, addRating } = interactionSlice.actions;
export default interactionSlice.reducer;
