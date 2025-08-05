import { createSlice } from "@reduxjs/toolkit";

const RequestsSlice = createSlice({
  name: "requests",
  initialState: null,
  reducers: {
    addRequests: (state, action) => action.payload,
    removeRequests: (state, action) => null,
  },
});

export const { addRequests, removeRequests } = RequestsSlice.actions;
export default RequestsSlice.reducer;
