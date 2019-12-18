import gql from 'graphql-tag';

export const USERINFO_WITH_EMAIL = gql`
  query getUserInfoWithEmail($email: String!) {
    user: getUser(email: $email) {
      email
      nickname
      thumbnail
      residence
      hometown
    }
    friends: getFriendsWithUserEmail(email: $email) {
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
