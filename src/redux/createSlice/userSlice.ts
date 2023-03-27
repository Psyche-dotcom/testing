import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  userAuthenticated: false,
  user: null,
};

export const userAuthSlice = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {
    userAuthReducer: (state, action) => {
      state.userAuthenticated = action.payload.authenticated;
      state.user = action.payload.user;
    },
  },
});

export const { userAuthReducer } = userAuthSlice.actions;
export default userAuthSlice.reducer;
