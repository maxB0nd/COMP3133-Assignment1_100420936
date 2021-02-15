const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');

dotenv.config();
const URL = process.env.MONGODB_URL;
const PORT = process.env.PORT;

const UserTypeDefs = require('./schemas/user');
const UserResolvers = require('./resolvers/user');
const HotelTypeDefs = require('./schemas/hotel');
const HotelResolvers = require('./resolvers/hotel');
const BookingTypeDefs = require('./schemas/booking');
const BookingResolvers = require('./resolvers/booking');

const connect = mongoose.connect(URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

connect.then((db) => {
  console.log('Connected correctly to server!');
}, (err) => {
  console.log(err);
});

const typeDefs = UserTypeDefs.typeDefs;
const resolvers = UserResolvers.resolvers;

const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers
});

const app = express();
app.use(bodyParser.json());
app.use('*', cors());
server.applyMiddleware({ app });
app.listen({ port: process.env.PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`));