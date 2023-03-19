import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Wrapper,
  GlobalStyle,
  Button,
  Form,
  Input,
  Label,
} from "../styles/styles";

function BookingForm() {
  const history = useNavigate();
  const [bookingData, setBookingData] = useState({
    name: "",
    email: "",
    passport: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    });
    if (response.ok) {
      history("/");
    } else {
      console.log("Error while booking flight.");
    }
  };

  const handleInputChange = (e) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Wrapper>
      <GlobalStyle />
      <h1>Booking Form</h1>
      <Form onSubmit={handleSubmit}>
        <Label>
          Name:
          <Input
            type="text"
            name="name"
            value={bookingData.name}
            onChange={handleInputChange}
          />
        </Label>
        <br />
        <Label>
          Email:
          <Input
            type="email"
            name="email"
            value={bookingData.email}
            onChange={handleInputChange}
          />
        </Label>
        <br />
        <Label>
          Passport:
          <Input
            type="text"
            name="passport"
            value={bookingData.passport}
            onChange={handleInputChange}
          />
        </Label>

        <br />
        <Button type="submit">Book Flight</Button>
      </Form>
    </Wrapper>
  );
}

export default BookingForm;
