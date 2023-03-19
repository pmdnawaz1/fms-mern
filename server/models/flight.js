const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  airline: { type: String, required: true },
  flightNumber: { type: String, required: true },
  departureAirport: { type: String, required: true },
  arrivalAirport: { type: String, required: true },
  departureDate: { type: Date, required: true },
  arrivalDate: { type: Date, required: true },
  price: { type: Number, required: true },
});

const Flight = mongoose.model('Flight', flightSchema);

module.exports = Flight;
