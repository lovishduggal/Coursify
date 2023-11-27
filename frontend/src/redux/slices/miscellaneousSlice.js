import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../helpers/axiosInstance';
import toast from 'react-hot-toast';

const initialState = {};

export const getAllStats = createAsyncThunk(
  'misc/admin/getallstats',
  async () => {
    try {
      const response = axiosInstance.get(`/admin/stats`);
      toast.promise(response, {
        loading: 'Fetching all stats...',
        success: response => {
          return response?.data?.message;
        },
        error: 'Failed to fetch the stats',
      });
      return (await response).data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
);

export const contactUs = createAsyncThunk('misc/conatctus', async data => {
  try {
    const response = axiosInstance.post(`/contact`, data);
    toast.promise(response, {
      loading: 'Submitting...',
      success: response => {
        return response?.data?.message;
      },
      error: 'Failed to submit the request',
    });
    return (await response).data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
});

export const courseRequest = createAsyncThunk('misc/courserequest', async data => {
  try {
    const response = axiosInstance.post(`/courserequest`, data);
    toast.promise(response, {
      loading: 'Submitting...',
      success: response => {
        return response?.data?.message;
      },
      error: 'Failed to submit the request',
    });
    return (await response).data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
});

const miscSlice = createSlice({
  name: 'misc',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAllStats.fulfilled, (state, action) => {
      state.stats = action.payload.stats;
      state.viewsCount = action.payload.viewsCount;
      state.subscriptionCount = action.payload.subscriptionCount;
      state.usersCount = action.payload.usersCount;
      state.subscriptionPercentage = action.payload.subscriptionPercentage;
      state.viewsPercentage = action.payload.viewsPercentage;
      state.usersPercentage = action.payload.usersPercentage;
      state.subscriptionProfit = action.payload.subscriptionProfit;
      state.viewsProfit = action.payload.viewsProfit;
      state.usersProfit = action.payload.usersProfit;
    });
  },
});

export default miscSlice.reducer;
