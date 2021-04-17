const { gql } = require('apollo-server-express');

exports.typeDefs = gql`
  type Booking {
    booking_id: ID!
    hotel_id: ID!
    booking_date: String!
    booking_start: String!
    booking_end: String!
    user_id: ID!
  }

  type Query {
    getBooking: [Booking]
    getBookingByID(user_id: ID!): Booking
    getBookingByUserID(user_id: ID!): [Booking]
    getBookingByHotelID(hotel_id: ID!): [Booking]
    getBookingByDate(booking_date: String!): [Booking]
    getBookingByCheckInDate(booking_start: String!): [Booking]
  }

  type Mutation {
    addBooking(booking_id: ID!, hotel_id: ID!, booking_date: String!, booking_start: String!, booking_end: String!, user_id: ID!): Booking

    updateBooking(booking_id: ID!, hotel_id: ID!, booking_date: String!, booking_start: String!, booking_end: String!, user_id: ID!): Booking

    deleteBooking(booking_id: ID!): Booking
  }
`;
