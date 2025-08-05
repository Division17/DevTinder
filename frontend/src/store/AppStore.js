import { configureStore } from '@reduxjs/toolkit'
import UserReducer from './UserSlice';
import FeedReducer from './FeedSlice'
import ConnectionReducer from './ConnectionsSlice'
import RequestReducer from './RequestsSlice'

const AppStore = configureStore({
    reducer: {
        user: UserReducer,
        feed: FeedReducer,
        connections: ConnectionReducer,
        requests:RequestReducer
    }
})

export default AppStore;