import api from './axios';

export const getVendors = () => api.get('/api/vendors');
export const getVendorById = (id) => api.get(`/api/vendors/${id}`);
export const createVendor = (data) => api.post('/api/vendors', data);
export const getMyVendor = () => api.get('/api/vendors/me');
export const addMenuItem = (vendorId, data) => api.post(`/api/vendors/${vendorId}/menu-items`, data);