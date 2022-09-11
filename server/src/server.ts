import { ApolloServer, gql } from 'apollo-server-express';
import compression from 'compression';
import express, { Application } from 'express';
import { PubSub } from 'graphql-subscriptions';
import http from 'http';
import { resolvers } from './graphql/resolvers';
import { typeDefs } from './graphql/typeDefs';

/**
 * @constant PORT - the port the app will run on.
 */
const PORT = 8080;
const app: Application = express();
export const pubsub = new PubSub();

/**
 * @param schema - the service schema.
 * @param validationRules - since in federation you can get limitless-depth object there is
 * a configured limitation.
 * @param playground - enable the graphql playground environment.
 */
const server: ApolloServer = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  introspection: true,
});

app.use(compression());

const httpServer = http.createServer(app);

server.applyMiddleware({ app });

server.installSubscriptionHandlers(httpServer);

/**
 * @param {number} port -The port the app would run on.
 * The @constant PORT is defined above.
 */
httpServer.listen({ URL, port: PORT }, (): void => {
  console.log(`🚀 Server ready at https://${PORT}${server.subscriptionsPath}`);
  console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`);
});
