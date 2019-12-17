import gql from 'graphql-tag';

export const GET_WRITING_FEED = gql`
  {
    writingFeedContent @client
  }
`;

export const ENROLL_WRITING_FEED = gql`
  mutation enrollWritingFeed($content: String!) {
    enrollWritingFeed(content: $content) @client
  }
`;
