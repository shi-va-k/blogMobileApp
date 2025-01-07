// postsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const postsSlice = createSlice({
  name: 'posts',
  initialState: [],
  reducers: {
    addPost: (state, action) => {
      state.unshift(action.payload); // Add new post to the top
    },
  },
});

export const { addPost } = postsSlice.actions;

export default postsSlice.reducer;
