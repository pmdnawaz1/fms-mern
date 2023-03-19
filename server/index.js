// index.js

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const flightRoutes = require("./routes/flightRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const FlightSearch = require("./routes/FlightSearch");
const authMiddleware = require("./middleware/authMiddleware");
const config = require("./config");
const cors = require("cors");

// Connect to MongoDB database
mongoose
  .connect(config.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB database!");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB database:", err);
  });

// Create Express app
const app = express();

// Use middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const Flight = require('./models/flight');

// const flights = [
//   {
//     flightNumber: 'BA101',
//     airline: 'British Airways',
//     departureAirport: 'LHR',
//     arrivalAirport: 'JFK',
//     departureDate: new Date('2023-04-10T12:30:00Z'),
//     arrivalDate: new Date('2023-04-10T20:45:00Z'),
//     price: 450.99,
//     seatsAvailable: 20,
//     maxCapacity: 200,
//     createdAt: new Date(),
//     updatedAt: new Date()
// },
// {
//     flightNumber: 'AF202',
//     airline: 'Air France',
//     departureAirport: 'CDG',
//     arrivalAirport: 'HND',
//     departureDate: new Date('2023-07-25T14:45:00Z'),
//     arrivalDate: new Date('2023-07-26T08:20:00Z'),
//     price: 650.99,
//     seatsAvailable: 15,
//     maxCapacity: 150,
//     createdAt: new Date(),
//     updatedAt: new Date()
// },
// {
//     flightNumber: 'DL306',
//     airline: 'Delta Air Lines',
//     departureAirport: 'ATL',
//     arrivalAirport: 'LAX',
//     departureDate: new Date('2023-11-01T07:00:00Z'),
//     arrivalDate: new Date('2023-11-01T09:45:00Z'),
//     price: 320.99,
//     seatsAvailable: 25,
//     maxCapacity: 200,
//     createdAt: new Date(),
//     updatedAt: new Date()
// },
// {
//   flightNumber: 'EK202',
//   airline: 'Emirates',
//   departureAirport: 'DXB',
//   arrivalAirport: 'JFK',
//   departureDate: '2023-04-10T12:30:00.000Z',
//   arrivalDate: '2023-04-10T20:15:00.000Z',
//   price: 625.99,
//   seatsAvailable: 50,
//   maxCapacity: 250,
//   createdAt: new Date(),
//   updatedAt: new Date()
// },
// {
//   flightNumber: 'DL231',
//   airline: 'Delta Air Lines',
//   departureAirport: 'ATL',
//   arrivalAirport: 'LAX',
//   departureDate: '2023-05-20T15:45:00.000Z',
//   arrivalDate: '2023-05-20T18:30:00.000Z',
//   price: 250.50,
//   seatsAvailable: 100,
//   maxCapacity: 300,
//   createdAt: new Date(),
//   updatedAt: new Date()
// },
// {
//   flightNumber: 'TK82',
//   airline: 'Turkish Airlines',
//   departureAirport: 'IST',
//   arrivalAirport: 'SFO',
//   departureDate: '2023-06-15T09:00:00.000Z',
//   arrivalDate: '2023-06-15T17:00:00.000Z',
//   price: 780.25,
//   seatsAvailable: 30,
//   maxCapacity: 200,
//   createdAt: new Date(),
//   updatedAt: new Date()
// },
// {
//   flightNumber: 'AI144',
//   airline: 'Air India',
//   departureAirport: 'BOM',
//   arrivalAirport: 'LHR',
//   departureDate: '2023-07-05T06:00:00.000Z',
//   arrivalDate: '2023-07-05T11:30:00.000Z',
//   price: 315.75,
//   seatsAvailable: 80,
//   maxCapacity: 250,
//   createdAt: new Date(),
//   updatedAt: new Date()
// },
// {
//   flightNumber: 'UA142',
//   airline: 'United Airlines',
//   departureAirport: 'LAX',
//   arrivalAirport: 'JFK',
//   departureDate: new Date('2023-03-15T09:45:00'),
//   arrivalDate: new Date('2023-03-15T18:15:00'),
//   price: 520.75,
//   seatsAvailable: 10,
//   maxCapacity: 150,
//   createdAt: new Date(),
//   updatedAt: new Date()
// },
// {
//   flightNumber: 'DL22',
//   airline: 'Delta Airlines',
//   departureAirport: 'ATL',
//   arrivalAirport: 'LHR',
//   departureDate: new Date('2023-04-01T11:30:00'),
//   arrivalDate: new Date('2023-04-02T05:00:00'),
//   price: 850.00,
//   seatsAvailable: 5,
//   maxCapacity: 100,
//   createdAt: new Date(),
//   updatedAt: new Date()
// },
// {
//   flightNumber: 'AA102',
//   airline: 'American Airlines',
//   departureAirport: 'JFK',
//   arrivalAirport: 'LAX',
//   departureDate: new Date('2023-04-15T12:00:00'),
//   arrivalDate: new Date('2023-04-15T20:30:00'),
//   price: 480.50,
//   seatsAvailable: 15,
//   maxCapacity: 200,
//   createdAt: new Date(),
//   updatedAt: new Date()
// }


   
    
// ];

// for (let i = 0; i < flights.length; i++) {
//   const flight = new Flight(flights[i]);
//   flight.save()
//     .then(() => console.log('Flight added to database'))
//     .catch(err => console.error(err));
// }

// Define routes
app.use("/auth", authRoutes);
app.use("/flights", flightRoutes); //authMiddleware.authenticateUser,
app.use("/bookings", bookingRoutes);
app.use("/flight-search", FlightSearch);

// Start server
app.listen(config.PORT, () => {
  console.log(`Server started on port ${config.PORT}!`);
});
