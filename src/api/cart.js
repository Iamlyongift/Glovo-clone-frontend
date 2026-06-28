import api from './axios';

export const getCart = () => api.get('/api/cart');
export const addToCart = (data) => api.post('/api/cart/items', data);
export const updateCartItem = (id, data) => api.put(`/api/cart/items/${id}`, data);
export const removeCartItem = (id) => api.delete(`/api/cart/items/${id}`);
export const clearCart = () => api.delete('/api/cart');