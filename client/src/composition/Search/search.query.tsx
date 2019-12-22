import gql from 'graphql-tag';

export const REQUEST_FRIEND = gql`
  mutation sendRequest($email: String!, $relation: String!) {
    requestFriend(targetEmail: $email, relation: $relation)
  }
`;

export const SEARCH_USER = gql`
  query getUserName($keyword: String!) {
    searchUser(keyword: $keyword) {
      nickname
      email
      relation
      thumbnail
    }
  }
`;
