import { Resolvers } from '../../interfaces/types';
import { helloQueries } from './helloResolvers';

export const resolvers: Resolvers = {
  ...helloQueries,
};
