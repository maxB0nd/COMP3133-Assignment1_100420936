const mongoose = require('mongoose');
const BookingSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    min: 0
  },
  hotel_id: {
    type: Number,
    required: true,
    min: 0
  },
  booking_date: {
    type: Date,
    default: (new Date()).toISOString().split('T')[0],
    required: [true, 'Please provide correct date of booking'],
    validate: {
      validator: function (booking_date) {
        return !!booking_date && Date(booking_date) >= Date((new Date()).toISOString().split('T')[0]);
      },
      message: props => `${props.value} booking date cannot be in a past`
    }
  },
  booking_start: {
    type: Date,
    default: (new Date()).toISOString().split('T')[0],
    required: [true, 'Please provide correct start of booking'],
    validate: {
      validator: function (booking_start) {
        return !!booking_start && Date(booking_start) >= Date((new Date()).toISOString().split('T')[0]);
      },
      message: props => `${props.value} booking cannot start in the past`
    }
  },
  booking_end: {
    type: Date,
    required: [true, 'Please provide correct end of booking'],
    validate: {
      validator: function (booking_end) {
        return !!booking_end && Date(booking_end) >= Date((new Date()).toISOString().split('T')[0]);
      },
      message: props => `${props.value} booking cannot end in the past`
    }
  },
  user_id: {
    type: Number,
    required: true,
    min: 0
  },
});

const Booking = mongoose.model("Booking", BookingSchema);
module.exports = Booking;