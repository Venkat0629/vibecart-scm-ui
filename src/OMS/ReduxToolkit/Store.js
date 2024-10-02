import { configureStore } from '@reduxjs/toolkit';
import authReducer from './AuthSlice';
import orderReducer from './OrderSlice'
import inventoryReducer from './InventorydashboardSlice'
const store = configureStore({
  reducer: {
    auth: authReducer,
    orders: orderReducer,
    inventory: inventoryReducer,
  },
});

export default store;
