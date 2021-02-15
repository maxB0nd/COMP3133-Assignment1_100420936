const mongoose = require('mongoose');
const HotelSchema = new mongoose.Schema({});

const Hotel = mongoose.model("Hotel", HotelSchema);
module.exports = Hotel;