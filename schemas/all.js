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

  type Hotel {
    hotel_id: ID!
    hotel_name: String!
    street: String!
    city: String!
    postal_code: String!
    price: Float!
    email: String!
    user_id: ID!
  }

  type User {
    user_id: ID!
    username: String!
    email: String!
    password: String!
  }

  type Query {
    getBooking: [Booking]
    getBookingByID(user_id: ID!): [Booking]
    getBookingByUserID(user_id: ID!): [Booking]
    getBookingByHotelID(hotel_id: ID!): [Booking]
    getBookingByDate(booking_date: String!): [Booking]
    getBookingByCheckInDate(booking_start: String!): [Booking]
    getHotel: [Hotel]
    getHotelByHotelID(hotel_id: ID!): [Hotel]
    getHotelByHotelName(hotel_name: String!): [Hotel]
    getHotelByCity(city: String!): [Hotel]
    getUser: [User]
    getUserByUserID(user_id: ID!): [User]
    getUserByUsername(username: String!): [User]
    getUserByEmail(email: String!): [User]
  }

  type Mutation {
    addBooking(booking_id: ID!, hotel_id: ID!, booking_date: String!, booking_start: String!, booking_end: String!, user_id: ID!): Booking

    updateBooking(booking_id: ID!, hotel_id: ID!, booking_date: String!, booking_start: String!, booking_end: String!, user_id: ID!): Booking

    deleteBooking(booking_id: ID!): Booking
    addHotel(hotel_id: ID!, hotel_name: String!, street: String!, city: String!, postal_code: String!, price: Float!, email: String!, user_id: ID!): Hotel

    updateHotel(hotel_id: ID!, hotel_name: String!, street: String!, city: String!, postal_code: String!, price: Float!, email: String!, user_id: ID!): Hotel

    deleteHotel(hotel_id: ID!): Hotel
    addUser(user_id: ID!, username: String!, email: String!, password: String!): User

    updateUser(user_id: ID!, username: String!, email: String!, password: String!): User

    deleteUser(user_id: ID!): User
  }
`;
