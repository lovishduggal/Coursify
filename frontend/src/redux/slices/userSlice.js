import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../helpers/axiosInstance';
import toast from 'react-hot-toast';

const initialState = {
  user: {},
  isAuthenticated: false,
};

export const login = createAsyncThunk('user/login', async data => {
  try {
    const response = axiosInstance.post('/login', data);
    toast.promise(response, {
      loading: 'Logging',
      success: response => {
        return response?.data?.message;
      },
      error: 'Failed to LoggedIn',
    });
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action?.payload?.user;
      state.isAuthenticated = true;
    });
  },
});
export default userSlice.reducer;
