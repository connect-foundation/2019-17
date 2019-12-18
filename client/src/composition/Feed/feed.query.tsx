import gql from 'graphql-tag';

export const GET_FEEDS = gql`
  query getfeeds($first: Int, $currentCursor: String) {
    feeds(first: $first, cursor: $currentCursor) {
      cursor
      feedItems {
        searchUser {
          nickname
          hometown
          thumbnail
          residence
          email
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
          nickname
          thumbnail
        }
      }
    }
  }
`;

export const GET_USER_FEEDS = gql`
  query getUserFeeds($first: Int, $currentCursor: String, $email: String!) {
    feeds: userFeeds(first: $first, cursor: $currentCursor, email: $email) {
      cursor
      feedItems {
        searchUser {
          nickname
          hometown
          thumbnail
          residence
          email
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
          nickname
          thumbnail
        }
      }
    }
  }
`;

export const GET_FEED = gql`
  query getfeed($feedId: Int!) {
    feed(feedId: $feedId) {
      searchUser {
        nickname
        hometown
        thumbnail
        residence
        email
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
        nickname
        thumbnail
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
          hometown
          thumbnail
          residence
          email
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
          nickname
          thumbnail
        }
      }
    }
  }
`;

export const WRITE_COMMENT = gql`
  mutation writeComment($content: String!, $feedId: Int!) {
    writeComment(content: $content, feedId: $feedId)
  }
`;

export const SEND_LIKE = gql`
  mutation updateLike($feedId: Int, $count: Int) {
    updateLike(feedId: $feedId, count: $count)
  }
`;
