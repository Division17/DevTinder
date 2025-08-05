import { createSlice } from "@reduxjs/toolkit";

const RequestsSlice = createSlice({
  name: "requests",
  initialState: null,
  reducers: {
    addRequests: (state, action) => action.payload,
    removeRequests: (state, action) => {
      const newArray = state.filter(r => r._id !== action.payload)
      return newArray;
    },
  },
});

export const { addRequests, removeRequests } = RequestsSlice.actions;
export default RequestsSlice.reducer;
