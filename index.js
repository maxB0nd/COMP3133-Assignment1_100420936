const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');

dotenv.config();
const URL = process.env.MONGODB_URL;
const PORT = process.env.PORT;

const AllTypeDefs = require('./schemas/all');
const AllResolvers = require('./resolvers/all');

const connect = mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connect.then(
  (db) => {
    console.log('Connected correctly to server!');
  },
  (err) => {
    console.log(err);
  }
);

const server = new ApolloServer({
  typeDefs: AllTypeDefs.typeDefs,
  resolvers: AllResolvers.resolvers,
});

const app = express();
app.use(bodyParser.json());
app.use('*', cors());
server.applyMiddleware({ app });
app.listen({ port: process.env.PORT }, () => console.log(`🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`));
