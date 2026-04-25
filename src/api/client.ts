import axios from 'axios';

const client = axios.create({
  baseURL: 'https://api.dokidokidesu.com', // Placeholder URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
client.interceptors.request.use(
  (config) => {
    // Inject Auth token if available
    // const token = useAuthStore.getState().token;
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Global error handling
      switch (error.response.status) {
        case 401:
          console.error('Unauthorized - Redirecting to login');
          break;
        case 500:
          console.error('Server error - Try again later');
          break;
        default:
          console.error(`API Error: ${error.response.status}`);
      }
    }
    return Promise.reject(error);
  }
);

export default client;
