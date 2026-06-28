import api from './axios';

export const placeOrder = (data) => api.post('/api/orders', data);
export const getMyOrders = () => api.get('/api/orders/my-orders');
export const getVendorOrders = () => api.get('/api/orders/vendor-orders');
export const updateOrderStatus = (id, status) =>
  api.patch(`/api/orders/${id}/status`, { status });