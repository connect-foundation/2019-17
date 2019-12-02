const findUserWithEmailQuery = `MATCH (user:User {email: {email}}) RETURN user`;
const findUserWithNicknameQuery = `MATCH (user:User) WHERE user.nickname=~{nickname} RETURN user`;
const findUserByNicknameQueryWithoutMe = `MATCH (user:User) WHERE user.nickname=~{nickname} AND user.email <> {email} RETURN user`;

export {
  findUserWithEmailQuery,
  findUserWithNicknameQuery,
  findUserByNicknameQueryWithoutMe
};
