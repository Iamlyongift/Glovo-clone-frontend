import api from './axios';

export const getAllUsers = () => api.get('/api/admin/users');
export const getAllVendors = () => api.get('/api/admin/vendors');
export const getAllOrders = () => api.get('/api/admin/orders');
export const toggleUserActive = (id) => api.patch(`/api/admin/users/${id}/toggle-active`);
export const toggleVendorOpen = (id) => api.patch(`/api/admin/vendors/${id}/toggle-open`);