import { gql } from 'apollo-boost';

export const ENROLL_FEED_MUTATION = gql`
  mutation enrollFeed($content: String!, $files: [Upload]) {
    enrollFeed(content: $content, files: $files)
  }
`;

export const ME_QUERY = gql`
  query me {
    me {
      thumbnail
      email
      nickname
    }
  }
`;
