import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    user: null,
    loading: false,
    error: null,
    flights: [], // Add initial state for flights
    hotels: [], // Add initial state for hotels
    visa: [], // Add initial state for visa
};

// Async thunk to handle login API call
export const loginApi = createAsyncThunk(
    'user/login',
    async (values, { rejectWithValue, dispatch }) => {
        try {
            const response = await axios.post(`https://joveratoursimbackend-git-main-abdullah-shahs-projects-3915135f.vercel.app/api/users/login`, {
                email: values.email,
                password: values.password,
            });

            // Get token from response
            const token = response.data.token;

            // Fetch additional data after successful login
            await Promise.all([
                dispatch(fetchFlights(token)),
                dispatch(fetchHotels(token)),
                dispatch(fetchVisa(token)),
            ]);

            return response.data;
        } catch (error) {
            if (error.response?.status === 401) {
                // Assuming 404 is returned if the user is not registered
                return rejectWithValue('Please create an account first.');
            }
            return rejectWithValue(error.response?.data || 'An error occurred. Please try again.');
        }
    }
);


// Async thunk to fetch flights
export const fetchFlights = createAsyncThunk(
    'user/fetchFlights',
    async (token, { rejectWithValue }) => {
        try {
            const response = await axios.get(`https://joveratoursimbackend-git-main-abdullah-shahs-projects-3915135f.vercel.app/api/flights/get-all-flights`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch flights.');
        }
    }
);

// Async thunk to fetch hotels
export const fetchHotels = createAsyncThunk(
    'user/fetchHotels',
    async (token, { rejectWithValue }) => {
        try {
            const response = await axios.get(`https://joveratoursimbackend-git-main-abdullah-shahs-projects-3915135f.vercel.app/api/hotels/get-all-hotels`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch hotels.');
        }
    }
);

// Async thunk to fetch visa
export const fetchVisa = createAsyncThunk(
    'user/fetchVisa',
    async (token, { rejectWithValue }) => {
        try {
            const response = await axios.get(`https://joveratoursimbackend-git-main-abdullah-shahs-projects-3915135f.vercel.app/api/visa/get-all-visa`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch visa.');
        }
    }
);

const loginSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.loading = false;
            state.error = null;
            state.flights = [];
            state.hotels = [];
            state.visa = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginApi.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginApi.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload; // Set user data from API response
            })
            .addCase(loginApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Login failed. Please try again.';
            })
            .addCase(fetchFlights.fulfilled, (state, action) => {
                state.flights = action.payload;
            })
            .addCase(fetchHotels.fulfilled, (state, action) => {
                state.hotels = action.payload;
            })
            .addCase(fetchVisa.fulfilled, (state, action) => {
                state.visa = action.payload;
            })
            .addCase(fetchFlights.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(fetchHotels.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(fetchVisa.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
