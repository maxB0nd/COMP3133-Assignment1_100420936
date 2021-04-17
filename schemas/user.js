const { gql } = require('apollo-server-express');

exports.typeDefs = gql`
  type User {
    user_id: ID!
    username: String!
    email: String!
    password: String!
  }

  type Query {
    getUser: [User]
    getUserByUserID(user_id: ID!): User
    getUserByUsername(username: String!): User
    getUserByEmail(email: String!): User
  }

  type Mutation {
    addUser(user_id: ID!, username: String!, email: String!, password: String!): User

    updateUser(user_id: ID!, username: String!, email: String!, password: String!): User

    deleteUser(user_id: ID!): User
  }
`;
