const { gql } = require('apollo-server-express');

exports.typeDefs = gql`
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

  type Query {
    getHotel: [Hotel]
    getHotelByHotelID(hotel_id: ID!): Hotel
    getHotelByHotelName(hotel_name: String!): [Hotel]
    getHotelByCity(city: String!): [Hotel]
  }

  type Mutation {
    addHotel(hotel_id: ID!, hotel_name: String!, street: String!, city: String!, postal_code: String!, price: Float!, email: String!, user_id: ID!): Hotel

    updateHotel(hotel_id: ID!, hotel_name: String!, street: String!, city: String!, postal_code: String!, price: Float!, email: String!, user_id: ID!): Hotel

    deleteHotel(hotel_id: ID!): Hotel
  }
`;
