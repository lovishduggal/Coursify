import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import courseReducer from './slices/courseSlice';
import paymentReducer from './slices/paymentSlice';
import miscReducer from './slices/miscellaneousSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    course: courseReducer,
    payment: paymentReducer,
    misc: miscReducer,
  },
});

export default store;
