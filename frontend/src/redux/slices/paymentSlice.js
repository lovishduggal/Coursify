import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../helpers/axiosInstance';
import toast from 'react-hot-toast';

const initialState = {
  subscriptionId: '',
};

export const buySubscription = createAsyncThunk(
  'payment/buysubscription',
  async data => {
    try {
      const response = axiosInstance.post(`/subscribe`);
      toast.promise(response, {
        loading: 'Subscribing....',
        success: response => {
          return response?.data?.message;
        },
        error: 'Failed to subscribe',
      });
      return (await response).data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
);

export const cancelSubscription = createAsyncThunk(
  'payment/cancelsubscription',
  async data => {
    try {
      const response = axiosInstance.delete(`/subscribe/cancel`);
      toast.promise(response, {
        loading: 'Unsubscribing....',
        success: response => {
          return response?.data?.message;
        },
        error: 'Failed to unsubscribe',
      });
      return (await response).data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
);

export const verifyUserPayment = createAsyncThunk(
  'payment/verification',
  async data => {
    try {
      const response = axiosInstance.post(`/paymentverification`, data);
      toast.promise(response, {
        loading: 'Verifying....',
        success: response => {
          return response?.data?.message;
        },
        error: 'Failed to Verify',
      });
      return (await response).data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
);

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(buySubscription.fulfilled, (state, action) => {
        state.subscriptionId = action?.payload?.subscriptionId;
      })
      .addCase(cancelSubscription.fulfilled, (state, action) => {
        state.subscriptionId = '';
      });
  },
});
export default paymentSlice.reducer;
