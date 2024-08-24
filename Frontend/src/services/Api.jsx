import axios from 'axios';

// Set up a base URL for your API requests
const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('loggedInUser.accessToken'); // Assuming you store the token in localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Function to send a GET request
export const get = async (endpoint, params = {}) => {
  try {
    const response = await api.get(endpoint, { params });
    return response.data;
  } catch (error) {
    console.error('GET request failed:', error);
    throw error;
  }
};

// Function to send a POST request
export const post = async (endpoint, data, isFileUpload = false) => {
  try {
    let config = {};
    if(isFileUpload){
      config.headers = {
        'Content-Type': 'multipart/form-data',
      };
    }
    const response = await api.post(endpoint, data, config);
    return response.data;
  } catch (error) {
    console.error('POST request failed:', error);
    throw error;
  }
};

// Function to send a PUT request
export const put = async (endpoint, data) => {
  try {
    const response = await api.put(endpoint, data);
    return response.data;
  } catch (error) {
    console.error('PUT request failed:', error);
    throw error;
  }
};

// Function to send a DELETE request
export const del = async (endpoint) => {
  try {
    const response = await api.delete(endpoint);
    return response.data;
  } catch (error) {
    console.error('DELETE request failed:', error);
    throw error;
  }
};

