import gql from 'graphql-tag';

export const typeDefs = gql`
  extend type Query {
    login: void
    logout: void
  }
  extend type Mutation {
    enrollWritingFeed: void
  }
`;
