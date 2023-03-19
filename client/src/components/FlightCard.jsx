import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  padding: 1.5rem;
  width: 350px;
  height: 300px;
  margin: 1rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    height: auto;
  }
`;

const AirlineLogo = styled.img`
  width: 50px;
  height: 50px;
  margin-bottom: 1rem;
`;

const FlightHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const FlightNumber = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-right: 1rem;
`;

const FlightPrice = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #fc9803;
`;

const FlightDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
`;

const FlightInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const FlightInfoIcon = styled.i`
  margin-right: 0.5rem;
  color: #777;
`;

const FlightInfoText = styled.p`
  font-size: 1rem;
  color: #777;
`;

const FlightCard = ({ flight }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate("/bookings");
  };

  return (
    <CardContainer to="/bookings" onClick={handleCardClick}>
      <AirlineLogo
        src={`https://picsum.photos/50?random=${flight._id}`}
        alt="Airline Logo"
      />
      <FlightHeader>
        <FlightNumber>{flight.flightNumber}</FlightNumber>
        <FlightPrice>${flight.price}</FlightPrice>
      </FlightHeader>
      <FlightDetails>
        <FlightInfo>
          <FlightInfoIcon className="fas fa-plane-departure"></FlightInfoIcon>
          <FlightInfoText>{flight.departureAirport}</FlightInfoText>
        </FlightInfo>
        <FlightInfo>
          <FlightInfoIcon className="fas fa-plane-arrival"></FlightInfoIcon>
          <FlightInfoText>{flight.arrivalAirport}</FlightInfoText>
        </FlightInfo>
        <FlightInfo>
          <FlightInfoIcon className="far fa-calendar-alt"></FlightInfoIcon>
          <FlightInfoText>
            {new Date(flight.departureDate).toDateString()}
          </FlightInfoText>
        </FlightInfo>
      </FlightDetails>
    </CardContainer>
  );
};

export default FlightCard;
