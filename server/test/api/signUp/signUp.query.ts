const CREATE_USER = num => `mutation($file: Upload!) {
    signUp(nickname: "testUser${num}", residence: "Seoul", hometown: "Seoul", googleId: "${num}", file: $file){
      nickname
      residence
      thumbnail
      hometown
    }
  }`;

const CREATE_USER_WITH_THUMBNAIL = num => `mutation {
    signUp(nickname: "testUser${num}", residence: "Seoul", hometown: "Seoul", googleId: "${num}"){
      nickname
      residence
      thumbnail
      hometown
    }
  }`;

export { CREATE_USER, CREATE_USER_WITH_THUMBNAIL };
