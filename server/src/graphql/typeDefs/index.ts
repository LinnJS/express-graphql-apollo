import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  schema {
    query: Query
  }

  type Query {
    hello: String
  }
`;
