
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: JSON.parse(localStorage.getItem('user'))
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload; 
    },
    clearUser: (state) => {
      state.user = null; 
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export const selectUser = (state) => state.user.user; 

export default userSlice.reducer;
