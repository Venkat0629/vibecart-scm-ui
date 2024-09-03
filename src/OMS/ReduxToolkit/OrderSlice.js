import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  const response = await axios.get('http://localhost:8090/vibe-cart/orders/getAllOrders');
  const orders = response.data.data || [];
  return orders.map((order) => ({
    orderId: order.orderId || '',
    skuId: order.orderItems?.[0]?.itemId || '',  
    productName: order.orderItems?.[0]?.itemName || '',
    
    size: '', 
    color: '', 
    quantity: order.totalQuantity || 0,
    unitPrice: order.orderItems?.[0]?.unitPrice || 0,
    totalPrice: order.totalAmount || 0,
    couponUsed: '', 
    discountedPrice: '', 
    paymentMethod: order.paymentMethod || '',
    payablePrice: order.totalAmount || 0,
    name: order.customer?.customerName || '',
    email: order.customer?.email || '',
    phone: order.customer?.phoneNumber || '',
    address: order.shippingAddress?.address || '',
    city: order.shippingAddress?.city || '',
    state: order.shippingAddress?.state || '',
    pincode: order.shippingAddress?.zipcode || '',
    orderStatus: order.orderStatus || '',
    selected: false, 
  }));
});

export const updateOrderOnServer = createAsyncThunk(
  'orders/updateOrder',
  async (order) => {
    const response = await axios.put(
      `http://localhost:8090/vibe-cart/orders/updateOrder/${order.orderId}`,
      order
    );
    return response.data;
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    orderData: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orderData = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateOrderOnServer.fulfilled, (state, action) => {
        const updatedOrder = action.payload;
        const existingOrderIndex = state.orderData.findIndex(
          (order) => order.orderId === updatedOrder.orderId
        );
        if (existingOrderIndex >= 0) {
          state.orderData[existingOrderIndex] = updatedOrder;
        }
      });
  },
});

export default orderSlice.reducer;
