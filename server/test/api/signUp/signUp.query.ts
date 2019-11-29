const CREATE_USER = num => `query {
    signUp(nickname: "testUser${num}", residence: "Seoul", hometown: "Seoul", googleId: "${num}" thumbnail: "https://images.velog.io/post-images/jerrynim_/d641d1f0-98d3-11e9-a4a8-6f520035a6ca/-2019-06-27-8.45.35.png"){
      nickname
      residence
      thumbnail
      hometown
    }
  }`;

export { CREATE_USER };
