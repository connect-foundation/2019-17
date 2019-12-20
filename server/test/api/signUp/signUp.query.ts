export const CREATE_USER = userId => `mutation($file: Upload!) {
    signUp(nickname: "testUser${userId}", residence: "Seoul", hometown: "Seoul", email: "${userId}q2w3e@naver.com", file: $file){
      nickname
      residence
      thumbnail
      hometown
    }
  }`;

export const CREATE_USER_WITHOUT_THUMBNAIL = userId => `mutation {
    signUp(nickname: "testUser${userId}", residence: "Seoul", hometown: "Seoul", email: "${userId}q2w3e@naver.com"){
      nickname
      residence
      thumbnail
      hometown
      email
    }
  }`;

export const FIND_USER_BY_NICKNAME = nickname =>
  `MATCH (u: User) WHERE u.nickname= '${nickname}' return u`;

export const DELETE_ALL_USERS = userIdArr => {
  return `MATCH (a) WHERE a.email IN [${userIdArr}] DETACH DELETE a`;
};

export const DELETE_SIGNED_UP_USERS = `MATCH (a) WHERE a.nickname=~'testUsersignUp.*' DELETE a`;
