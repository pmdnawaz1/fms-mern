
import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const getFlights = async () => {
  const response = await axios.get(`${API_URL}/flights`);
  return response.data.flights;
};

export const searchFlights = async (searchParams) => {
  const response = await axios.post(`${API_URL}/flights/search`, searchParams);
  return response.data.flights;
};

export const bookFlight = async (flightId, user) => {
  const response = await axios.post(`${API_URL}/flights/book`, { flightId, user });
  return response.data.booking;
};

export const getBookings = async (userId) => {
  const response = await axios.get(`${API_URL}/bookings?userId=${userId}`);
  return response.data.bookings;
};
