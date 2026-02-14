import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types';

const initialState = {
  user: {} as User | null,
}

const userSlice = createSlice({
  name: 'localUser',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = {...state.user, ...action.payload};
    },
    resetUser: () => initialState,
  },
});

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;