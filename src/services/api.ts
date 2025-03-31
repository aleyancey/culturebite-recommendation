import axios from 'axios';

// Create an axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for API calls
api.interceptors.request.use(
  (config) => {
    // You can add auth tokens here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Handle errors globally here
    return Promise.reject(error);
  }
);

// API service functions
export const apiService = {
  // GET request
  get: async <T>(url: string, params?: object) => {
    const response = await api.get<T>(url, { params });
    return response.data;
  },

  // POST request
  post: async <T>(url: string, data?: object) => {
    const response = await api.post<T>(url, data);
    return response.data;
  },

  // PUT request
  put: async <T>(url: string, data?: object) => {
    const response = await api.put<T>(url, data);
    return response.data;
  },

  // DELETE request
  delete: async <T>(url: string) => {
    const response = await api.delete<T>(url);
    return response.data;
  },
};

export default apiService; 