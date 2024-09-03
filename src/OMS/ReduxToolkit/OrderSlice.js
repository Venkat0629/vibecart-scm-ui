import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  const response = await axios.get('http://localhost:8090/vibe-cart/orders/getAllOrders');
  const orders = response.data.data || [];
  return orders.map((order) => ({
    orderId: order.orderId || '',
    skuId: order.orderItems?.[0]?.itemId || '',
    productName: order.orderItems?.[0]?.itemName || '',
    category: order.category || '',
    size: order.size || '',
    color: order.color || '',
    quantity: order.totalQuantity || '',
    unitPrice: order.orderItems?.[0]?.unitPrice || '',
    totalPrice: order.totalAmount || '',
    couponUsed: order.couponUsed || '',
    discountedPrice: order.discountedPrice || '',
    paymentMethod: order.paymentStatus || '',
    payablePrice: order.payablePrice || '',
    name: order.customerName || '',
    email: order.customerEmail || '',
    phone: order.customerPhone || '',
    address: order.shippingAddress || '',
    city: order.shippingCity || '',
    state: order.shippingState || '',
    pincode: order.shippingZipCode || '',
    orderStatus: order.orderStatus || '',
    selected: false,
  }));
});


export const updateOrderOnServer = createAsyncThunk(
  'orders/updateOrderOnServer',
  async (updatedOrder) => {
    const response = await axios.put(
      `http://localhost:8090/vibe-cart/orders/updateOrder/${updatedOrder.orderId}`,
      updatedOrder
    );
    return response.data;
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    orderData: [],
    loading: false,
    error: null,
  },
  reducers: {
    updateOrder: (state, action) => {
      state.orderData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orderData = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateOrderOnServer.fulfilled, (state, action) => {
        const updatedOrder = action.payload;
        state.orderData = state.orderData.map((order) =>
          order.orderId === updatedOrder.orderId ? updatedOrder : order
        );
      });
  },
});

export const { updateOrder } = orderSlice.actions;
export default orderSlice.reducer;
