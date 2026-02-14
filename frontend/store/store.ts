import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../src/components/UserComponent/userSlice';

const store = configureStore({
  reducer: {
    localUser: userReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store