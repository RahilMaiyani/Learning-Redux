import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: { 
    value: 0, 
    max: 7, 
    min: -7,
    err : "",
  },
  reducers: {
    increment: (state) => {
        state.err = ""
      if (state.value < state.max) {
        state.value += 1;
        console.log("Value incremented to", state.value);
      } else {
        state.err = "Max Limit Reached"
        console.log("Maximum limit Reached!");
      }
    },
    decrement: (state) => {
        state.err = ""
      if (state.value > state.min) {
        state.value -= 1;
        console.log("Value decremented to", state.value);
      } else {
        
        state.err = "Min Limit Reached"
        console.log("Minimum limit Reached!");
      }
    }
  }
});

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;