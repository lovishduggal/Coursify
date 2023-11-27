import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../helpers/axiosInstance';
import toast from 'react-hot-toast';

const initialState = {
  user: {},
  users: [],
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

export const forgotPassword = createAsyncThunk(
  'user/forgotpassword',
  async data => {
    console.log(data);
    try {
      const response = axiosInstance.post('/forgotpassword', { email: data });
      toast.promise(response, {
        loading: 'Sending the reset link',
        success: response => {
          return response?.data?.message;
        },
        error: 'Failed to send the reset link',
      });
      return (await response).data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  'user/resetpassword',
  async data => {
    try {
      const { token, password } = data;
      const response = axiosInstance.put(`/resetpassword/${token}`, {
        password,
      });
      toast.promise(response, {
        loading: 'Resetting the password',
        success: response => {
          return response?.data?.message;
        },
        error: 'Failed to reset the password',
      });
      return (await response).data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
);

export const addToPlaylist = createAsyncThunk(
  'user/addtoplaylist',
  async data => {
    try {
      const response = axiosInstance.post(`/addtoplaylist`, data);
      toast.promise(response, {
        loading: 'Adding to the playlist',
        success: response => {
          return response?.data?.message;
        },
        error: 'Failed to add the course to the playlist',
      });
      return (await response).data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
);

export const removeFromPlaylist = createAsyncThunk(
  'user/removefromplaylist',
  async data => {
    const { id } = data;
    try {
      const response = axiosInstance.delete(`/removefromplaylist?id=${id}`);
      toast.promise(response, {
        loading: 'Removing from  the playlist',
        success: response => {
          return response?.data?.message;
        },
        error: 'Failed to remove the course to the playlist',
      });
      return (await response).data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
);

export const getAllUsers = createAsyncThunk(
  'user/admin/getallusers',
  async () => {
    try {
      const response = axiosInstance.get(`/admin/users`);
      toast.promise(response, {
        loading: 'Fetching the all users',
        success: response => {
          return response?.data?.message;
        },
        error: 'Failed to fetch all users',
      });
      return (await response).data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
);

export const updateUserRole = createAsyncThunk(
  'user/admin/updateuserrole',
  async data => {
    try {
      const { id } = data;
      const response = axiosInstance.put(`/admin/user/${id}`);
      toast.promise(response, {
        loading: 'Updating...',
        success: response => {
          return response?.data?.message;
        },
        error: 'Failed to update the user role',
      });
      return (await response).data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  'user/admin/deleteuser',
  async data => {
    try {
      const { id } = data;
      const response = axiosInstance.delete(`/admin/user/${id}`);
      toast.promise(response, {
        loading: 'deleting...',
        success: response => {
          return response?.data?.message;
        },
        error: 'Failed to delete the user',
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
  reducers: {
    updateUser: (state, action) => {
      state.user = action?.payload?.user;
    },
  },
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
      })
      .addCase(addToPlaylist.fulfilled, (state, action) => {
        state.user = action?.payload?.user;
      })
      .addCase(removeFromPlaylist.fulfilled, (state, action) => {
        state.user = action?.payload?.user;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.users = action?.payload?.users;
      })
      .addCase(updateUserRole.fulfilled, (state, action) => {
        state.users = action?.payload?.users;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = action?.payload?.users;
      });
  },
});
export default userSlice.reducer;
export const { updateUser } = userSlice.actions;
