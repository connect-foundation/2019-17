import gql from 'graphql-tag';

export const USERINFO_BY_EMAIL = gql`
  query getUserInfoByEmail($email: String!) {
    user: getUser(email: $email) {
      email
      nickname
      thumbnail
      residence
      hometown
    }
    friends: getFriendsByUserEmail(email: $email) {
      email
      nickname
      thumbnail
      residence
      hometown
    }
    me {
      email
    }
    relation: findRelation(email: $email)
  }
`;
