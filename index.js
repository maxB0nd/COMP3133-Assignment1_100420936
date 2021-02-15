const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const schema = buildSchema(
  `type Query {
    hello: String
    greetings(name: String): String
  }`
);

const root = {
  hello: () => 'Hello World!',
  greetings: (args) => {
    return `Hello, ${args.name}`
  },
};

const app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,        //Set schema
  rootValue: root, //Set resolver
  graphiql: true             //Client access
}));

app.listen(4000, () => console.log('Express GraphQL Server Now Running On http://localhost:4000/graphql'));