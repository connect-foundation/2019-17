const CREATE_USER = userId => `mutation($file: Upload!) {
    signUp(nickname: "testUser${userId}", residence: "Seoul", hometown: "Seoul", email: "${userId}q2w3e@naver.com", file: $file){
      nickname
      residence
      thumbnail
      hometown
    }
  }`;

const CREATE_USER_WITHOUT_THUMBNAIL = userId => `mutation {
    signUp(nickname: "testUser${userId}", residence: "Seoul", hometown: "Seoul", email: "${userId}q2w3e@naver.com"){
      nickname
      residence
      thumbnail
      hometown
      email
    }
  }`;

const FIND_USER_BY_NICKNAME = nickname =>
  `MATCH (u: User) WHERE u.nickname= '${nickname}' return u`;

const DELETE_ALL_USERS = `
MATCH (u1: User) WHERE u1.nickname=~ 'testUser.*' 
OPTIONAL MATCH (u1)-[r]-(u2)
DETACH DELETE u1, r, u2`;
export {
  CREATE_USER,
  CREATE_USER_WITHOUT_THUMBNAIL,
  DELETE_ALL_USERS,
  FIND_USER_BY_NICKNAME
};
