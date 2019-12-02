import { gql } from 'apollo-boost';

export const ENROLL_FEED_MUTATION = gql`
  mutation enrollFeed($content: String!, $files: [Upload]) {
    enrollFeed(content: $content, files: $files) {
      searchUser {
        thumbnail
        email
        nickname
      }
      feedId
      feed {
        createdAt {
          year
          month
          day
          hour
          minute
          second
          nanosecond
        }
        content
      }
      totallikes
      hasLiked
    }
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
