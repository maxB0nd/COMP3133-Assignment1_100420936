const mongoose = require('mongoose');
const BookingSchema = new mongoose.Schema({});

const Booking = mongoose.model("Booking", BookingSchema);
module.exports = Booking;