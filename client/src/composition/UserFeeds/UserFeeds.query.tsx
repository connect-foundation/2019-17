import gql from 'graphql-tag';

export const USERINFO_With_EMAIL = gql`
  query getUserInfoWithEmail($email: String!) {
    user: userWithEmail(email: $email) {
      email
      nickname
      thumbnail
      residence
      hometown
    }
    friends: friendsWithUserEmail(email: $email) {
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
