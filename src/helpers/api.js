const axios = require('axios').default;

const API = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {'Authorization': localStorage.getItem('bearer_token')}
});

export default API