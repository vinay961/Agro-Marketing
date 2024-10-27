import axios from 'axios';

// Set up a base URL for API requests
const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Add request interceptor to include the JWT token
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
const get = async (endpoint, params = {}) => {
  try {
    const response = await api.get(endpoint, { params });
    return response.data;
  } catch (error) {
    handleError('GET', error);
    throw error;
  }
};

// Function to send a POST request
const post = async (endpoint, data, isFileUpload = false) => {
  try {
    const config = isFileUpload ? {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    } : {};
    const response = await api.post(endpoint, data, config);
    return response.data;
  } catch (error) {
    console.error('POST request failed:', error);
    throw error;
  }
};

// Function to send a PUT request
const put = async (endpoint, data) => {
  try {
    const response = await api.put(endpoint, data);
    return response.data;
  } catch (error) {
    console.error('PUT request failed:', error);
    throw error;
  }
};

// Function to send a DELETE request
const del = async (endpoint) => {
  try {
    const response = await api.delete(endpoint);
    return response.data;
  } catch (error) {
    console.error('DELETE request failed:', error);
    throw error;
  }
};

const handleError = (method, error) => {
  if (error.response) {
    console.error(`${method} request failed with response:`, error.response);
    console.error('Status:', error.response.status);
    console.error('Data:', error.response.data);
  } else if (error.request) {
    console.error(`${method} request made but no response received:`, error.request);
  } else {
    console.error(`${method} request setup error:`, error.message);
  }
};

export { get, post, put, del };
