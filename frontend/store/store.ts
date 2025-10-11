import { configureStore } from '@reduxjs/toolkit'
import loginReducer from '../src/components/Login/loginSlice';
import userReducer from '../src/components/UserComponent/userSlice';

const store = configureStore({
  reducer: {
    loginForm: loginReducer,
    localUser: userReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store