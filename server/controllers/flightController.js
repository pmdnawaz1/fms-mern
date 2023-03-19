const Flight = require('../models/flight');

const flightController = {};

flightController.getFlights = async (req, res) => {
  try {
    const flights = await Flight.find({});
    res.json(flights);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

flightController.createFlight = async (req, res) => {
  try {
    const { name, from, to, date, price, seats } = req.body;
    const flight = new Flight({ name, from, to, date, price, seats });
    await flight.save();
    res.status(201).json(flight);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = flightController;
