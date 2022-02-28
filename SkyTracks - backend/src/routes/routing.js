const express = require('express');
const routing = express.Router();
const create = require('../model/dbsetup');
const flightBookingServ = require('../service/users');
const FlightBooking = require('../model/flightbooking');

routing.get('/setupDb', (req, res, next) => {
    create.setupDb().then((data) => {
        res.send(data)
    }).catch((err) => {
        next(err)
    })
})

routing.get('/getFlights/:origin/:destination', (req, res, next) => {
    let origin = req.params.origin;
    let destination = req.params.destination;
    flightBookingServ.getFlightOnRoute(origin, destination).then(flights => {
        res.json(flights);
    }).catch(err => next(err));
})

routing.get('/viewBookingDetails/:bookingId', (req, res, next) => {
    let bookingId = Number(req.params.bookingId);
    flightBookingServ.getBooking(bookingId).then((bookingDetails) => {
        res.json(bookingDetails);
    }).catch((err) => next(err))
})

routing.post('/bookFlight', (req, res, next) => {
    const bookingDetails = new FlightBooking(req.body);
    flightBookingServ.bookFlight(bookingDetails).then((bookingDetails) => {
        res.json(bookingDetails);
    }).catch((err) => next(err))
})


module.exports = routing;