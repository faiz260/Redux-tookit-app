import {createAsyncThunk ,createSlice } from "@reduxjs/toolkit";

export const fetchRandomNumber = createAsyncThunk(
  "numbers/fetchRandomNumber",
  async (data, thunkAPI) => {
    const response = await fetch("/api/randomNumber");
    return await response.json();
  },
) 

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
    isLoading: false
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    reset: (state) => {
      state.value = 0;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
  extraReducers:{
    [fetchRandomNumber.fulfilled]: (state, action) => {
      state.value += action.payload;
      state.isLoading = false;
      console.log("Api function called: " , state.value, action)
    },
    [fetchRandomNumber.rejected]: (state, action) => {
      console.log("Api call rejected")
      state.isLoading = false;
    },
    [fetchRandomNumber.pending]: (state, action) => {
      state.isLoading = true;
    }
  }
});

export const { increment, decrement, reset, incrementByAmount } = counterSlice.actions;

export const incrementAsync = (amount) => (dispatch) => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 1000);
};

export const selectCount = (state) => state.counter;

export default counterSlice.reducer;
