import gql from 'graphql-tag';

export const GET_FRIENDS_STATUS = gql`
  query getFriends {
    friends {
      email
      nickname
      thumbnail
      status
    }
  }
`;

export const UPDATE_USER_STATE = gql`
  subscription updateUserState {
    updateUserState {
      email
      nickname
      thumbnail
      status
    }
  }
`;
