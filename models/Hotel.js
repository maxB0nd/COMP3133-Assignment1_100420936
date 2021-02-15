const mongoose = require('mongoose');
const HotelSchema = new mongoose.Schema({
  hotel_id: {
    type: Number,
    required: true,
    min: 0
  },
  hotel_name: {
    type: String,
    required: [true, 'Please enter hotel name'],
    trim: true,
  },
  street: {
    type: String,
    required: [true, 'Please enter street name'],
    trim: true,
  },
  city: {
    type: String,
    required: [true, 'Please enter city name'],
    trim: true,
  },
  postal: {
    type: String,
    required: [true, 'Please enter postal code'],
    trim: true,
    uppercase: true,
    validate: {
      validator: function (postal) {
        return /^\d\D\d\D\d\D$/.test(postal);
      },
      message: props => `${props.value} is not a valid postal cose, postal code should be in foroamt like #A#A#A`
    }
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (email) {
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(email);
      },
      message: props => `${props.value} is not a valid email`
    }
  },
  user_id: {
    type: Number,
    required: true,
    min: 0
  },
});

const Hotel = mongoose.model("Hotel", HotelSchema);
module.exports = Hotel;