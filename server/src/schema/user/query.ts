const findUserWithEmailQuery = `MATCH (user:User {email: {email}}) RETURN user`;
const findUserWithNicknameQuery = `MATCH (user:User) WHERE user.nickname=~{nickname} RETURN user`;
const findUserAndRelationByNicknameWithoutMeQuery = `MATCH (user:User {email: "ashley.ssumu@gmail.com"})<-[r:REQUEST_FRIEND]-(target: User)
WHERE target.nickname=~ "sang.*" AND target.email <> "ashley.ssumu@gmail.com" AND r is not null
RETURN "REQUESTED_FROM" as type, target
UNION ALL
MATCH (target: User)
WHERE NOT (:User {email: "ashley.ssumu@gmail.com"})-[:REQUEST_FRIEND]-(target) AND target.email <> "ashley.ssumu@gmail.com"
RETURN null as type, target
UNION ALL
MATCH (user:User {email: "ashley.ssumu@gmail.com"})-[r:REQUEST_FRIEND]->(target: User)
WHERE target.nickname=~ "sang.*" AND target.email <> "ashley.ssumu@gmail.com" AND r is not null
RETURN "REQUEST" as type, target`;

// `MATCH (user:User {email: {email}})-[r]-(target: User)
// WHERE target.nickname=~ {nickname} AND target.email <> {email} RETURN user, type(r), target`;
// const findUserByNicknameHasRelationWithMe = `MATCH (user:User) WHERE user.nickname=~{nickname} AND user.email <> {email} RETURN user`;

export {
  findUserWithEmailQuery,
  findUserWithNicknameQuery,
  findUserAndRelationByNicknameWithoutMeQuery
};
