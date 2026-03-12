import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = async ({ email, password }) => {
  const response = await client.post('/login', { email, password });
  return response.data;
};

const authHeaders = (token) => ({
  Authorization: `Bearer ${token}`,
});

export const getEnrollmentTrends = async (token) => {
  const response = await client.get('/dashboard/enrollment-trends', {
    headers: authHeaders(token),
  });
  return response.data;
};

export const getCourseDistribution = async (token) => {
  const response = await client.get('/dashboard/course-distribution', {
    headers: authHeaders(token),
  });
  return response.data;
};

export const getAttendance = async (token) => {
  const response = await client.get('/dashboard/attendance', {
    headers: authHeaders(token),
  });
  return response.data;
};

