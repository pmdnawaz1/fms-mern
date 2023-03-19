import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FlightList from '../components/FlightList';
import FlightSearchForm from '../components/FlightSearchForm';

const Home = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get('http://localhost:5000/flights');
        setFlights(response.data.flights);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFlights();
  }, []);

  const handleSearch = async (searchParams) => {
    try {
      const response = await axios.post('http://localhost:5000/flights/search', searchParams);
      setFlights(response.data.flights);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Flights</h1>
      <FlightSearchForm onSearch={handleSearch} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <FlightList flights={flights} />
      )}
    </div>
  );
};

export default Home;
