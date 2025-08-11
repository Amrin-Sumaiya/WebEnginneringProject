import axios from 'axios';

// Create a new instance of axios with a custom configuration
const api = axios.create({
  // Set the base URL for all API requests.
  // This should point to your backend server.
  baseURL: 'http://localhost:8000/api/v1', 
});

/**
 * Axios Request Interceptor
 * * This function runs before every single request is sent from your frontend.
 * Its purpose is to check if a JWT token exists in localStorage and, if it does,
 * automatically add it to the 'Authorization' header.
 * * This saves you from having to manually add the token to every protected API call.
 */
api.interceptors.request.use(
  (config) => {
    // 1. Get the token from local storage
    const token = localStorage.getItem('petcare_token');
    
    // 2. If the token exists, add it to the request headers
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    // 3. Return the modified config object to proceed with the request
    return config;
  },
  (error) => {
    // Handle any errors that occur during the request setup
    return Promise.reject(error);
  }
);

// Export the configured instance to be used throughout your application
export default api;
