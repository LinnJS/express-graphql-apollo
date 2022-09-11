import { ApolloServer } from 'apollo-server';
import compression from 'compression';
import express, { Application } from 'express';
import { PubSub } from 'graphql-subscriptions';
import { resolvers } from './graphql/resolvers';
import { typeDefs } from './graphql/typeDefs';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';

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
  plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
});

app.use(compression());

/**
 * @param {number} port -The port the app would run on.
 * The @constant PORT is defined above.
 */
// The `listen` method launches a web server.
server.listen({ port: PORT }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
