import React, { useState } from 'react';
import axios from 'axios';
import {Wrapper, GlobalStyle, Button, Form, Input, Label} from '../styles/styles'

const FlightSearchForm = ({ setFlights }) => {
  const [departureAirport, setDepartureAirport] = useState('');
  const [arrivalAirport, setArrivalAirport] = useState('');
  const [departureDate, setDepartureDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.get(`http://localhost:5000/flights/search`, {
        params: {
          departureAirport,
          arrivalAirport,
          departureDate,
        },
      });

      setFlights(res.data.flights);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Wrapper>
      <GlobalStyle />
    <Form onSubmit={handleSubmit}>
      <Label>
        Departure Airport:
        <Input
          type="text"
          value={departureAirport}
          onChange={(e) => setDepartureAirport(e.target.value)}
        />
      </Label>
      <Label>
        Arrival Airport:
        <Input
          type="text"
          value={arrivalAirport}
          onChange={(e) => setArrivalAirport(e.target.value)}
        />
      </Label>
      <Label>
        Departure Date:
        <Input
          type="date"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
        />
      </Label>
      <Button type="submit">Search Flights</Button>
    </Form>
    </Wrapper>
  );
};

export default FlightSearchForm;
