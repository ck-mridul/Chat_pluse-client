
import { createSlice } from '@reduxjs/toolkit';

const peerSlice = createSlice({
  name: 'peer',
  initialState: {
    peer: {}
  },
  reducers: {
    setPeer: (state, action) => {
      state.peer = action.payload; 
    },
    clearPeer: (state) => {
      state.peer = {}; 
    },
  },
});

export const { setPeer, clearPeer } = peerSlice.actions;
export const selectPeer = (state) => state.peer; 

export default peerSlice.reducer;
