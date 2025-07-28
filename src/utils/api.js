import axios from 'axios';
import toast from 'react-hot-toast';

const API_BASE_URL = 'http://localhost:3000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || error.message || 'Something went wrong';
    toast.error(message);
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: async (credentials) => {
    const response = await api.post('/users/login', credentials);
    return response.data;
  },
  register: async (userData) => {
    const response = await api.post('/users', userData);
    return response.data;
  },
};

// Products API
export const productsAPI = {
  getAll: async () => {
    const response = await api.get('/products');
    return response.data;
  },
  getByKey: async (key) => {
    const response = await api.get(`/products/${key}`);
    return response.data;
  },
  create: async (productData) => {
    const response = await api.post('/products', productData);
    return response.data;
  },
  update: async (key, productData) => {
    const response = await api.put(`/products/${key}`, productData);
    return response.data;
  },
  delete: async (key) => {
    const response = await api.delete(`/products/${key}`);
    return response.data;
  },
};

// Reviews API
export const reviewsAPI = {
  getAll: async () => {
    const response = await api.get('/reviews');
    return response.data;
  },
  create: async (reviewData) => {
    const response = await api.post('/reviews', reviewData);
    return response.data;
  },
  delete: async (email) => {
    const response = await api.delete(`/reviews/${email}`);
    return response.data;
  },
  approve: async (email) => {
    const response = await api.put(`/reviews/approve/${email}`);
    return response.data;
  },
};

// Inquiries API
export const inquiriesAPI = {
  getAll: async () => {
    const response = await api.get('/inquiries');
    return response.data;
  },
  create: async (inquiryData) => {
    const response = await api.post('/inquiries', inquiryData);
    return response.data;
  },
  update: async (id, inquiryData) => {
    const response = await api.put(`/inquiries/${id}`, inquiryData);
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/inquiries/${id}`);
    return response.data;
  },
};

export default api;