import gql from 'graphql-tag';

export default gql`
  extend type Query {
    login: void
    logout: void
  }
  extend type Mutation {
    enrollWritingFeed: void
  }
`;
