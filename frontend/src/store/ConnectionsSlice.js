import { createSlice } from "@reduxjs/toolkit";

const ConnectionsSLice = createSlice({
    name: "connections",
    initialState: null,
    reducers: {
        addConnections: (state, action) => action.payload,
        removeConnections: (state, action)=> null
    }
}) 

export const { addConnections, removeConnections } = ConnectionsSLice.actions;
export default ConnectionsSLice.reducer;