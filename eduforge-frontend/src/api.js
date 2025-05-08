// src/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: '/api',      // ← this hits Vite’s proxy -> Spring Boot
  withCredentials: true
});

export default API;