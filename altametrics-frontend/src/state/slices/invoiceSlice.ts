import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { setError } from './errorSlice';
import axios from 'axios';
const INVOICES_API_URL = 'http://localhost:3000/invoices';

interface Invoice {
  id: string;
  due_date: string;
  amount: number;
  description: string;
  user_id: number;
  user: {
    name: string;
  }
}

interface InvoiceState {
  currentInvoice: Invoice | null;  
  invoices: Invoice[];
  error: string | null;
}

const initialState: InvoiceState = {
  currentInvoice: null,
  invoices: [],
  error: null
};

export const fetchInvoices = createAsyncThunk(
    'invoices/fetchInvoices',
    async (_, { dispatch, rejectWithValue }) => {
      try {
        const response = await axios.get<Invoice[]>(INVOICES_API_URL);
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          dispatch(setError(error.response.data.message));
          return rejectWithValue(error.response.data);
        } else {
          dispatch(setError('An unknown error occured'));
          return rejectWithValue('An unknown error occurred');
        }
      }
    }
);

export const fetchInvoice = createAsyncThunk(
  'invoices/fetchInvoice',
  async (invoiceId: string | undefined, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get<Invoice>(INVOICES_API_URL + '/' + invoiceId);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        dispatch(setError(error.response.data.message));
        return rejectWithValue(error.response.data);
      } else {
        dispatch(setError('An unknown error occured'));
        return rejectWithValue('An unknown error occurred');
      }
    }
  }
);

export const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvoices.fulfilled, (state, action: PayloadAction<Invoice[]>) => {
        state.invoices = action.payload;
      })
      .addCase(fetchInvoices.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(fetchInvoice.fulfilled, (state, action: PayloadAction<Invoice>) => {
        state.currentInvoice = action.payload;
      })
      .addCase(fetchInvoice.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default invoiceSlice.reducer;
