import { configureStore } from '@reduxjs/toolkit'
import UserReducer from './UserSlice';
import FeedReducer from './FeedSlice'

const AppStore = configureStore({
    reducer: {
        user: UserReducer,
        feed: FeedReducer
    }
})

export default AppStore;