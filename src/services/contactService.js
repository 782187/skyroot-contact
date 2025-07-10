import axios from 'axios';

const API_URL = 'http://localhost:8080/api/contacts';

const getAllContacts = async () => {
  const response = await axios.get(API_URL, {
    withCredentials: true
  });
  return response.data;
};

const getContact = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`, {
    withCredentials: true
  });
  return response.data;
};

const createContact = async (contact) => {
  const response = await axios.post(API_URL, contact, {
    withCredentials: true
  });
  return response.data;
};

const updateContact = async (id, contact) => {
  const response = await axios.put(`${API_URL}/${id}`, contact, {
    withCredentials: true
  });
  return response.data;
};

const deleteContact = async (id) => {
  await axios.delete(`${API_URL}/${id}`, {
    withCredentials: true
  });
};

export default {
  getAllContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact
};