import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { clearError, setError } from './errorSlice';
import setAuthToken from '../../auth/auth';
import axios from 'axios';
const AUTH_API_URL = 'http://localhost:3000/auth';

interface AuthState {
  token: string | null;  
  isAuthenticated: boolean;
  error: string | null
}

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  isAuthenticated: Boolean(localStorage.getItem('token')),
  error: null
};

interface LoginCredentials {
    email: string;
    password: string;
}

export const login = createAsyncThunk(
    'auth/login',
    async (credentials: LoginCredentials, { dispatch, rejectWithValue }) => {
      try {
        const response = await axios.post(AUTH_API_URL + '/login', credentials);
        const token = response.data.access_token;
        localStorage.setItem('token', token);
        dispatch(clearError());
        setAuthToken(token);
        return token;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          dispatch(setError(error.response.data.message));
          return rejectWithValue(error.response.data.message);
        } else {
          dispatch(setError('An unknown error occurred'));
          return rejectWithValue('An unknown error occurred');
        }
      }
    }
);
  
  export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
        localStorage.removeItem('token');
        state.token = null;
        state.isAuthenticated = false;
        state.error = null;
        setAuthToken(state.token);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action: PayloadAction<string>) => {
        state.token = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
