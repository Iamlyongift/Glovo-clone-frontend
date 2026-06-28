import api from './axios';

export const getAvailableOrders = () => api.get('/api/deliveries/available');
export const claimOrder = (orderId) => api.post(`/api/deliveries/claim/${orderId}`);
export const updateDeliveryStatus = (id, status) =>
  api.patch(`/api/deliveries/${id}/status?status=${status}`);
export const getMyDeliveries = () => api.get('/api/deliveries/my-deliveries');