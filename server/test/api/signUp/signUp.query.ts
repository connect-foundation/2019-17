const CREATE_USER = num => `mutation($file: Upload!) {
    signUp(nickname: "testUser${num}", residence: "Seoul", hometown: "Seoul", email: "1q2w3e@naver.com", file: $file){
      nickname
      residence
      thumbnail
      hometown
    }
  }`;

const CREATE_USER_WITHOUT_THUMBNAIL = num => `mutation {
    signUp(nickname: "testUser${num}", residence: "Seoul", hometown: "Seoul", email: "1q2w3e@naver.com"){
      nickname
      residence
      thumbnail
      hometown
    }
  }`;

export { CREATE_USER, CREATE_USER_WITHOUT_THUMBNAIL };
