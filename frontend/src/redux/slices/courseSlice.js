import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../helpers/axiosInstance';
import toast from 'react-hot-toast';

const initialState = {
  courses: [],
};

export const getAllCourses = createAsyncThunk(
  'course/getallcourses',
  async data => {
    try {
      const { keyword, category } = data;
      const response = axiosInstance.get(
        `/courses?keyword=${keyword}&category=${category}`
      );
      toast.promise(response, {
        loading: 'Fetching the courses',
        success: response => {
          console.log(response?.data?.message);
          return response?.data?.message;
        },
        error: 'Failed to fetch the courses',
      });
      return (await response).data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
);

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAllCourses.fulfilled, (state, action) => {
      console.log(action);
      state.courses = action.payload.courses;
    });
  },
});
export default courseSlice.reducer;
