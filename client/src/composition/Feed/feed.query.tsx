import gql from 'graphql-tag';

export const GET_FEEDS = gql`
  query getfeeds($first: Int, $currentCursor: String) {
    feeds(first: $first, cursor: $currentCursor) {
      cursor
      feedItems {
        searchUser {
          nickname
        }
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
        feedId
        totallikes
        hasLiked
        imglist {
          url
        }
        comments {
          id
          content
        }
      }
    }
  }
`;

export const FEEDS_SUBSCRIPTION = gql`
  subscription subscribeFeed($userEmail: String!) {
    feeds(userEmail: $userEmail) {
      cursor
      feedItems {
        searchUser {
          nickname
        }
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
        feedId
        totallikes
        hasLiked
        comments {
          id
          content
        }
      }
    }
  }
`;
