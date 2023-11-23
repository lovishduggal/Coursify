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

export const register = createAsyncThunk('user/register', async data => {
  try {
    const response = axiosInstance.post('/register', data);
    toast.promise(response, {
      loading: 'Registering user...',
      success: response => {
        return response?.data?.message;
      },
      error: 'Failed to register the user',
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

export const logout = createAsyncThunk('user/logout', async () => {
  try {
    const response = axiosInstance.get('/logout');
    toast.promise(response, {
      loading: 'Logging out...',
      success: response => {
        return response?.data?.message;
      },
      error: 'Failed to Logged out',
    });
    return (await response).data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
});

export const updateProfile = createAsyncThunk(
  'user/updateprofile',
  async data => {
    try {
      const response = axiosInstance.put('/updateprofile', data);
      toast.promise(response, {
        loading: 'Updating the user profile',
        success: response => {
          return response?.data?.message;
        },
        error: 'Failed to update  the user profile',
      });
      return (await response).data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
);

export const changePassword = createAsyncThunk(
  'user/changepassword',
  async data => {
    try {
      const response = axiosInstance.put('/changepassword', data);
      toast.promise(response, {
        loading: 'Changing the user password',
        success: response => {
          return response?.data?.message;
        },
        error: 'Failed to change the user password',
      });
      return (await response).data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
);

export const updateProfilePicture = createAsyncThunk(
  'user/updateprofilepicture',
  async data => {
    try {
      const response = axiosInstance.put('/updateprofilepicture', data);
      toast.promise(response, {
        loading: 'Updating the user profile picture',
        success: response => {
          return response?.data?.message;
        },
        error: 'Failed to update  the user profile picture',
      });
      return (await response).data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
);

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
        state.user = action?.payload?.user;
        if (state.user) state.isAuthenticated = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.user = {};
        state.isAuthenticated = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action?.payload?.user;
        state.isAuthenticated = true;
      });
    // .addCase(updateprofile.fulfilled, (state, action) => {
    //   state.user = action?.payload?.user;
    //   state.isAuthenticated = true;
    // });
  },
});
export default userSlice.reducer;
