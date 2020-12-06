import axios from "axios"

const API = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {'Authorization': localStorage.getItem('bearer_token')}
});

API.interceptors.request.use(
  async config => {
    config.headers = { 
      'Authorization': `${localStorage.getItem('bearer_token')}`,
      'Accept': 'application/json'
    }
    return config;
  },
  error => {
    Promise.reject(error)
});

export default API