import { configureStore } from '@reduxjs/toolkit'
import  UserSlice from './UserSlice';

const AppStore = configureStore({
    reducer: {
        user:UserSlice
    }
})

export default AppStore;