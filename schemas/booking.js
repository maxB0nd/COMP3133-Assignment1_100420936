const { gql } = require('apollo-server-express');

exports.typeDefs = gql`
  type Booking {
    id: ID!
    hotel_id: ID!
    booking_date: String!
    booking_start: String!
    booking_end: String!
    user_id: ID!
  }

  type Query {
    getBooking: [Booking]
    getBookingByUserID (id: ID!): [Booking]
    getBookingByHotelID (hotel_id: ID!): [Booking]
    getBookingByDate (booking_date: String!): [Booking]
    getBookingByCheckInDate (booking_start: String!): [Booking]
  }

  type Mutation {
    addBooking(
      id: ID!
      hotel_id: ID!
      booking_date: String!
      booking_start: String!
      booking_end: String!
      user_id: ID!
    ): Booking

    updateBooking(
      id: ID!
      hotel_id: ID!
      booking_date: String!
      booking_start: String!
      booking_end: String!
      user_id: ID!
    ): Booking

    deleteBooking(id: ID!): Booking
  }
`;
