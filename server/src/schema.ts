import { GraphQLSchema } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';
import { fileLoader, mergeResolvers, mergeTypes } from 'merge-graphql-schemas';
import path from 'path';

const mergedTypes: GraphQLSchema[] = fileLoader(
  path.join(__dirname, 'api/**/*.graphql')
);

const mergedResolvers: any[] = fileLoader(
  path.join(__dirname, 'api/**/*.resolvers.*')
);

const typeDefs = mergeTypes(mergedTypes);
const resolvers = mergeResolvers(mergedResolvers);

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
