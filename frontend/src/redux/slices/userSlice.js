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
    return (await response).data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
});

export const loadUser = createAsyncThunk('user/load', async () => {
  try {
    const response = axiosInstance.get('/me');
    toast.promise(response, {
      loading: 'Loading the user',
      success: response => {
        return response?.data?.message;
      },
      error: 'Failed to Load the user',
    });
    return (await response).data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action?.payload?.user;
        state.isAuthenticated = true;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        console.log(action);
        state.user = action?.payload?.user;
        state.isAuthenticated = true;
      });
  },
});
export default userSlice.reducer;
