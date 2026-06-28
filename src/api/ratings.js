import api from './axios';

export const submitRating = (data) => api.post('/api/ratings', data);
export const getVendorRatings = (vendorId) => api.get(`/api/ratings/vendor/${vendorId}`);