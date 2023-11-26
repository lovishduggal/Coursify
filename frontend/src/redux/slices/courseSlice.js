import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../helpers/axiosInstance';
import toast from 'react-hot-toast';

const initialState = {
  courses: [],
  lectures: [],
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

export const getCourseLectures = createAsyncThunk(
  'course/getcourselectures',
  async data => {
    try {
      const { id } = data;
      const response = axiosInstance.get(`/course/${id}`);
      toast.promise(response, {
        loading: 'Fetching the course lectures',
        success: response => {
          return response?.data?.message;
        },
        error: 'Failed to fetch the course lectures',
      });
      return (await response).data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
);

export const createCourse = createAsyncThunk(
  'user/admin/createcourse',
  async data => {
    try {
      const response = axiosInstance.post(`/createcourse`, data);
      toast.promise(response, {
        loading: 'Creating.....',
        success: response => {
          return response?.data?.message;
        },
        error: 'Failed to create the course ',
      });
      return (await response).data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
);

export const deleteCourse = createAsyncThunk(
  'user/admin/deletecourse',
  async data => {
    const { id } = data;
    try {
      const response = axiosInstance.delete(`/course/${id}`);
      toast.promise(response, {
        loading: 'deleting.....',
        success: response => {
          return response?.data?.message;
        },
        error: 'Failed to delete the course ',
      });
      return (await response).data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
);

export const addLecture = createAsyncThunk(
  'user/admin/addlecture',
  async data => {
    try {
      const { id, title, description, file } = data;
      console.log('jii', id, title, description, file);
      const response = axiosInstance.post(
        `/course/${id}`,
        {
          title,
          description,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      toast.promise(response, {
        loading: 'Adding.....',
        success: response => {
          return response?.data?.message;
        },
        error: 'Failed to add the lecture',
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
    builder
      .addCase(getAllCourses.fulfilled, (state, action) => {
        state.courses = action?.payload?.courses;
      })
      .addCase(getCourseLectures.fulfilled, (state, action) => {
        state.lectures = action?.payload?.lectures;
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.courses = action?.payload?.courses;
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.courses = action?.payload?.courses;
      })
      .addCase(addLecture.fulfilled, (state, action) => {
        state.lectures = action?.payload?.lectures;
      });
  },
});
export default courseSlice.reducer;
