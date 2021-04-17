const Booking = require('../models/Booking');
const Hotel = require('../models/Hotel');
const User = require('../models/User');

exports.resolvers = {
  Query: {
    getBooking: async (parent, args) => {
      return await Booking.find({});
    },
    getBookingByID: async (parent, args) => {
      return await Booking.find({ booking_id: args.booking_id });
    },
    getBookingByHotelID: async (parent, args) => {
      return await Booking.find({ hotel_id: args.hotel_id });
    },
    getBookingByUserID: async (parent, args) => {
      return await Booking.find({ user_id: args.user_id });
    },
    getBookingByDate: async (parent, args) => {
      return await Booking.find({ booking_date: args.booking_date });
    },
    getBookingByCheckInDate: async (parent, args) => {
      return await Booking.find({ booking_start: args.booking_start });
    },
    getHotel: async (parent, args) => {
      return await Hotel.find({});
    },
    getHotelByHotelID: async (parent, args) => {
      return await Hotel.find({ hotel_id: args.hotel_id });
    },
    getHotelByHotelName: async (parent, args) => {
      return await Hotel.find({ hotel_name: args.hotel_name });
    },
    getHotelByCity: async (parent, args) => {
      return await Hotel.find({ city: args.city });
    },
    getUser: async (parent, args) => {
      return await User.find({});
    },
    getUserByUserID: async (parent, args) => {
      return await User.find({ user_id: args.user_id });
    },
    getUserByUsername: async (parent, args) => {
      return await User.find({ username: args.username });
    },
    getUserByEmail: async (parent, args) => {
      return await User.find({ email: args.email });
    },
  },
  Mutation: {
    addBooking: async (parent, args) => {
      const isValidBookingDate = !!args.booking_date && Date(args.booking_date) >= Date(new Date().toISOString().split('T')[0]);
      const isValidBookingStart = !!args.booking_start && Date(args.booking_start) >= Date(new Date().toISOString().split('T')[0]);
      const isValidBookingEnd = !!args.booking_end && Date(args.booking_end) >= Date(new Date().toISOString().split('T')[0]);
      if (!isValidBookingDate) {
        throw new Error('Booking date cannot be in the past');
      }
      if (!isValidBookingStart) {
        throw new Error('Booking start cannot be in the past');
      }
      if (!isValidBookingEnd) {
        throw new Error('Booking end cannot be in the past');
      }
      let newBooking = new Booking({
        booking_id: args.booking_id,
        hotel_id: args.hotel_id,
        booking_date: args.booking_date,
        booking_start: args.booking_start,
        booking_end: args.booking_end,
        user_id: args.user_id,
      });
      return await newBooking.save();
    },
    updateBooking: async (parent, args) => {
      if (!args.booking_id) {
        return JSON.stringify({
          status: false,
          message: 'No Booking with this ID is found',
        });
      }
      return await Booking.findOneAndUpdate(
        { booking_id: args.booking_id },
        {
          $set: {
            booking_id: args.booking_id,
            hotel_id: args.hotel_id,
            booking_date: args.booking_date,
            booking_start: args.booking_start,
            booking_end: args.booking_end,
            user_id: args.user_id,
          },
        },
        { new: true },
        (err, Booking) => {
          if (err) {
            return JSON.stringify({
              status: false,
              message: 'Something went wrong when updating the Booking',
            });
          } else {
            return Booking;
          }
        }
      );
    },
    deleteBooking: async (parent, args) => {
      if (!args.booking_id) {
        return JSON.stringify({
          status: false,
          message: 'No Booking with this ID is found',
        });
      }
      return await Booking.findOneAndDelete({ booking_id: args.booking_id });
    },
    addHotel: async (parent, args) => {
      const emailExpression = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      const postalExpression = /^\D\d\D\d\D\d$/;
      const isValidEmail = emailExpression.test(String(args.email).toLowerCase());
      const isValidPostal = postalExpression.test(String(args.postal_code).toLowerCase());
      const isValidPrice = !isNaN(args.price) && args.price >= 0;
      if (!isValidEmail) {
        throw new Error('email is not in proper format');
      }
      if (!isValidPostal) {
        throw new Error('Postal code in not in proper format');
      }
      if (!isValidPrice) {
        throw new Error('Price cannot be negative and should be a number');
      }
      let newHotel = new Hotel({
        hotel_id: args.hotel_id,
        hotel_name: args.hotel_name,
        street: args.street,
        city: args.city,
        postal_code: args.postal_code,
        price: args.price,
        email: args.email,
        user_id: args.user_id,
      });
      return await newHotel.save();
    },
    updateHotel: async (parent, args) => {
      if (!args.hotel_id) {
        return JSON.stringify({
          status: false,
          message: 'No Hotel with this ID is found',
        });
      }
      return await Hotel.findOneAndUpdate(
        { hotel_id: args.hotel_id },
        {
          $set: {
            hotel_id: args.hotel_id,
            hotel_name: args.hotel_name,
            street: args.street,
            city: args.city,
            postal_code: args.postal_code,
            price: args.price,
            email: args.email,
            user_id: args.user_id,
          },
        },
        { new: true },
        (err, Hotel) => {
          if (err) {
            return JSON.stringify({
              status: false,
              message: 'Something went wrong when updating the Hotel',
            });
          } else {
            return Hotel;
          }
        }
      );
    },
    deleteHotel: async (parent, args) => {
      if (!args.hotel_id) {
        return JSON.stringify({
          status: false,
          message: 'No Hotel with this ID is found',
        });
      }
      return await Hotel.findOneAndDelete({ hotel_id: args.hotel_id });
    },
    addUser: async (parent, args) => {
      const emailExpression = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      const isValidEmail = emailExpression.test(String(args.email).toLowerCase());
      const isValidUserName = args.username && args.username.length >= 4;
      const isValidPassword = args.password && args.password.length >= 8;
      if (!isValidEmail) {
        throw new Error('email is not in proper format');
      }
      if (!isValidUserName) {
        throw new Error('username is too short');
      }
      if (!isValidPassword) {
        throw new Error('password is too short');
      }
      let newUser = new User({
        user_id: args.user_id,
        username: args.username,
        email: args.email,
        password: args.password,
      });
      return await newUser.save();
    },
    updateUser: async (parent, args) => {
      if (!args.user_id) {
        return JSON.stringify({
          status: false,
          message: 'No User with this ID is found',
        });
      }
      return await User.findOneAndUpdate(
        { user_id: args.user_id },
        {
          $set: {
            user_id: args.user_id,
            username: args.username,
            password: args.password,
            email: args.email,
          },
        },
        { new: true },
        (err, user) => {
          if (err) {
            return JSON.stringify({
              status: false,
              message: 'Something went wrong when updating the user',
            });
          } else {
            return user;
          }
        }
      );
    },
    deleteUser: async (parent, args) => {
      if (!args.user_id) {
        return JSON.stringify({
          status: false,
          message: 'No User with this ID is found',
        });
      }
      return await User.findOneAndDelete({ user_id: args.user_id });
    },
  },
};
