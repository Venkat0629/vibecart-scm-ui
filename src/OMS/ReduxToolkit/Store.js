import { configureStore } from '@reduxjs/toolkit';
import authReducer from './AuthSlice';
import orderReducer from './OrderSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    orders: orderReducer,
  },
});

export default store;
