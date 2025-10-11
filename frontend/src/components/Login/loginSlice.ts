import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const loginSlice = createSlice({
  name: 'loginForm',
  initialState: { email: '', password: ''},
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      console.log(action.payload)
      if(action.payload === undefined) {
        state.email = ''
        return
      }
      state.email = action.payload
    },
    setPassword: (state, action: PayloadAction<string>) => {
      if(action.payload === undefined) {
        state.password = ''
        return
      }
      state.password = action.payload
    },
    resetForm: (state) => {
      state.email = ''
      state.password = ''
    }
  }
})

export const { setEmail, setPassword, resetForm } = loginSlice.actions
export default loginSlice.reducer