import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import courseReducer from './slices/courseSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    course: courseReducer,
  },
});

export default store;
