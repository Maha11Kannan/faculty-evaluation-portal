import axios from 'axios';

// This grabs the Render link you put in Vercel settings
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

export default api;