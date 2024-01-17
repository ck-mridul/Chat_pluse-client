
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import peerReducer from './peerSlice';


export const store = configureStore({
  reducer: {
    user: userReducer,
    peer:peerReducer
  },
});

