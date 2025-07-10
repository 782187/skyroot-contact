import axios from 'axios';

const API_URL = 'https://skyroot-server.onrender.com/api/auth';

const login = async (username, password) => {
  const response = await axios.post(`${API_URL}/login`, { username, password }, {
    withCredentials: true
  });
  return response.data;
};

const register = async (username, password) => {
  await axios.post(`${API_URL}/register`, { username, password });
};

const logout = async () => {
  await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
};

const getCurrentUser = async () => {
  const response = await axios.get(`${API_URL}/current`, {
    withCredentials: true
  });
  return response.data;
};

export default {
  login,
  register,
  logout,
  getCurrentUser
};