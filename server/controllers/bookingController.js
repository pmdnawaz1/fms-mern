const Booking = require('../models/booking');
const User = require('../models/user');
const Flight = require('../models/flight');

exports.createBooking = async (req, res) => {
  const { name, email, passport, flightId } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ name, email, passport });
      await user.save();
    }
    const flight = await Flight.findById(flightId);
    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }
    const booking = new Booking({ user: user._id, flight: flight._id });
    await booking.save();

    return res.status(201).json({ message: 'Booking created successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};
