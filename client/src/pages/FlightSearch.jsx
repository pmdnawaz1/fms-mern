import React, { useState } from "react";
import FlightList from "../components/FlightList";
import FlightSearchForm from "../components/FlightSearchForm";
import { searchFlights } from "../api/flight";

const FlightSearch = () => {
  const [flights, setFlights] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSearch = async (searchData) => {
    try {
      const response = await searchFlights(searchData);
      setFlights(response.data.flights);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div>
      <h1>Flight Search Page</h1>
      {errorMessage && <div className="error">{errorMessage}</div>}
      <FlightSearchForm onSearch={handleSearch} />
      {flights.length > 0 && <FlightList flights={flights} />}
    </div>
  );
};

export default FlightSearch;
