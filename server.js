const resolvers = require('./graphql/resolvers')
const typeDefs = require('./graphql/schemas');
const auth = require('./middelwares/auth');
const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const cors = {
  origin: "http://localhost:3001",
  credentials: true
};

const app = express();
app.use(auth)
app.use(express.static('public'));

const server = new ApolloServer({
    context: ({ req, res }) => {
      const isAuth = req.isAuth;
      const userId = req.userId;
      const role = req.role;
      return { role, isAuth, userId };
    },
    typeDefs,
    resolvers,
    cors
});

server.applyMiddleware({ app });

app.listen({ port: 3000 }, () =>
  console.log(`🚀 Server ready at http://localhost:3000${server.graphqlPath}`)
)