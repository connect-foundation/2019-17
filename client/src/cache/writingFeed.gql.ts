import gql from 'graphql-tag';

export const getWritingFeedData = gql`
  {
    writingFeedContent @client
  }
`;

export const enrollWritingFeedData = gql`
  mutation enrollWritingFeed($content: String!) {
    enrollWritingFeed(content: $content) @client
  }
`;
