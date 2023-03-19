import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, { email, password });
  return response.data.token;
};

export const signup = async (user) => {
  const response = await axios.post(`${API_URL}/auth/signup`, user);
  return response.data.token;
};
