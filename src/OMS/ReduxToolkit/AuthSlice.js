// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   isLoggedIn: false,
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     login: (state) => {
//       state.isLoggedIn = true;
//     },
//     logout: (state) => {
//       state.isLoggedIn = false;
//     },
//   },
// });

// export const { login, logout } = authSlice.actions;
// export default authSlice.reducer;


import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: !!localStorage.getItem('token'),
  },
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
      localStorage.removeItem('token');
      localStorage.clear()
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
