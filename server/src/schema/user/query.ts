const findUserWithEmailQuery = `MATCH (user:User {email: {email}}) RETURN user`;
const findUserWithNicknameQuery = `MATCH (user:User) WHERE user.nickname=~{nickname} RETURN user`;
const findFriendsQuery = `MATCH (user:User {email: {email}})-[:FRIEND]-(friends:User) RETURN friends`;
export { findUserWithEmailQuery, findUserWithNicknameQuery, findFriendsQuery };
