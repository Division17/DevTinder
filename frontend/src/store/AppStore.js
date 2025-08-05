import { configureStore } from '@reduxjs/toolkit'
import UserReducer from './UserSlice';
import FeedReducer from './FeedSlice'
import ConnectionReducer from './ConnectionsSlice'

const AppStore = configureStore({
    reducer: {
        user: UserReducer,
        feed: FeedReducer,
        connections: ConnectionReducer
    }
})

export default AppStore;