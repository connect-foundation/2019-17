import gql from 'graphql-tag';

export const GET_CHATROOMS_QUERY = gql`
  query getChatRooms {
    getChatRooms {
      otherUser {
        thumbnail
        nickname
        email
      }
      lastChat {
        email
        chatRoomId
        content
        createAt {
          year
          month
          day
          hour
          minute
        }
      }
    }
  }
`;

export const GET_CHATROOMS_SUBSCRIPTION = gql`
  subscription getChatRoomSubscription {
    getChatRooms {
      otherUser {
        thumbnail
        nickname
        email
      }
      lastChat {
        email
        chatRoomId
        content
        createAt {
          year
          month
          day
          hour
          minute
        }
      }
    }
  }
`;
