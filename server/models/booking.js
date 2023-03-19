const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  passport: { type: String, required: true },
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
