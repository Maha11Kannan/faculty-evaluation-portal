import axios from 'axios';

// Hardcoded Render Link - No more localhost!
const api = axios.create({
  baseURL: 'https://faculty-evaluation-portal.onrender.com/api',
});

export default api;