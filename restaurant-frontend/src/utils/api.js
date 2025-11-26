import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Enhanced request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to: ${config.url}`);
    
    // Only add token for order creation if it exists
    if (config.url.includes('/orders') && config.method === 'post') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Enhanced response interceptor
api.interceptors.response.use(
  (response) => {
    console.log(`Response received from: ${response.config.url}`, response.status);
    return response;
  },
  (error) => {
    console.error('API Response Error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    
    // Handle specific error cases
    if (error.code === 'ECONNREFUSED') {
      error.message = 'Cannot connect to backend server. Make sure it\'s running on port 5000.';
    } else if (error.response?.status === 404) {
      error.message = 'API endpoint not found. Check your backend routes.';
    } else if (error.response?.status === 500) {
      error.message = 'Server error. Check your backend console for details.';
    }
    
    return Promise.reject(error);
  }
);

// Menu API
export const menuAPI = {
  getMenuItems: () => api.get('/menu'),
  getMenuItem: (id) => api.get(`/menu/${id}`),
};

// Booking API
export const bookingAPI = {
  createBooking: (data) => api.post('/bookings', data),
  getBookings: () => api.get('/bookings'),
  getBooking: (id) => api.get(`/bookings/${id}`),
};

// Order API
export const orderAPI = {
  createOrder: (data) => api.post('/orders', data),
  getOrder: (id) => api.get(`/orders/${id}`),
  getOrders: () => api.get('/orders'), // Add this for admin dashboard
};

// Test connection
export const testConnection = async () => {
  try {
    const response = await api.get('/menu');
    return {
      success: true,
      data: response.data,
      message: `Backend connected successfully! Found ${response.data.length} menu items.`
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      message: 'Failed to connect to backend.'
    };
  }
};

export default api;