const Booking = require('../models/Booking');

exports.resolvers = {
  Query: {
    getBooking: async (parent, args) => {
      return await Booking.find({});
    },
    getBookingByID: async (parent, args) => {
      return await Booking.find({ "booking_id": args.booking_id });
    },
    getBookingByHotelID: async (parent, args) => {
      return await Booking.find({ "hotel_id": args.hotel_id });
    },
    getBookingByUserID: async (parent, args) => {
      return await Booking.find({ "user_id": args.user_id });
    },
    getBookingByDate: async (parent, args) => {
      return await Booking.find({ "booking_date": args.booking_date });
    },
    getBookingByCheckInDate: async (parent, args) => {
      return await Booking.find({ "booking_start": args.booking_start });
    },
  },
  Mutation: {
    addBooking: async (parent, args) => {
      const isValidBookingDate = !!args.booking_date && Date(args.booking_date) >= Date((new Date()).toISOString().split('T')[0]);
      const isValidBookingStart = !!args.booking_start && Date(args.booking_start) >= Date((new Date()).toISOString().split('T')[0]);
      const isValidBookingEnd = !!args.booking_end && Date(args.booking_end) >= Date((new Date()).toISOString().split('T')[0]);
      if (!isValidBookingDate) {
        throw new Error("Booking date cannot be in the past");
      }
      if (!isValidBookingStart) {
        throw new Error("Booking start cannot be in the past");
      }
      if (!isValidBookingEnd) {
        throw new Error("Booking end cannot be in the past");
      }
      let newBooking = new Booking({
        booking_id: args.booking_id,
        hotel_id: args.hotel_id,
        booking_date: args.booking_date,
        booking_start: args.booking_start,
        booking_end: args.booking_end,
        user_id: args.user_id,
      })
      return await newBooking.save();
    },
    updateBooking: async (parent, args) => {
      if (!args.booking_id) {
        return JSON.stringify({
          status: false,
          message: "No Booking with this ID is found"
        });
      }
      return await Booking.findOneAndUpdate(
        { "booking_id": args.booking_id },
        {
          $set: {
            booking_id: args.booking_id,
            hotel_id: args.hotel_id,
            booking_date: args.booking_date,
            booking_start: args.booking_start,
            booking_end: args.booking_end,
            user_id: args.user_id,
          }
        },
        { new: true },
        (err, Booking) => {
          if (err) {
            return JSON.stringify({
              status: false,
              message: "Something went wrong when updating the Booking"
            });
          } else {
            return Booking;
          }
        }
      )
    },
    deleteBooking: async (parent, args) => {
      if (!args.booking_id) {
        return JSON.stringify({
          status: false,
          message: "No Booking with this ID is found"
        });
      }
      return await Booking.findOneAndDelete({ booking_id: args.booking_id })
    },
  },
}