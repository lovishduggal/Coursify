import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import courseReducer from './slices/courseSlice';
import paymentReducer from './slices/paymentSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    course: courseReducer,
    payment: paymentReducer,
  },
});

export default store;
