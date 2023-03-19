import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BookingForm from "../components/BookingForm";
import { createBooking } from "../api/booking";

const Booking = () => {
  const history = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (bookingData) => {
    try {
      const response = await createBooking(bookingData);
      if (response.status === 201) {
        history.push("/bookings");
      }
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div>
      <h1>Booking Page</h1>
      {errorMessage && <div className="error">{errorMessage}</div>}
      <BookingForm onSubmit={handleSubmit} />
    </div>
  );
};

export default Booking;
