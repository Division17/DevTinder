import { createSlice } from "@reduxjs/toolkit";

const FeedSlice = createSlice({
    name: "feed",
    initialState: null,
    reducers: {
        addFeed: (state, action) => action.payload,
        removeFeed: (state, action) => {
            const newFeed = state.filter(feed => feed._id !== action.payload)
            return newFeed
        },
        removeAllFeed: (state, action)=>null
    }
})

export const { addFeed, removeFeed, removeAllFeed } = FeedSlice.actions
export default FeedSlice.reducer