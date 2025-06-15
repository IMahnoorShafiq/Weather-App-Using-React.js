

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const apiKey = '5560694c5487df96c723cdd3a1997398';

export const fetchWeatherData = createAsyncThunk(
  'weather/fetchWeatherData',
  async (city) => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Incorrect Input');
    }
    const data = await response.json();
    return data;
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    weatherData: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.status = 'pending';
        state.error = null;
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.weatherData = action.payload;
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
        state.weatherData = null;
      });
  },
});

export default weatherSlice.reducer;
