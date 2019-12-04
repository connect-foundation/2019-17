const findUserWithEmailQuery = `MATCH (user:User {email: {email}}) RETURN user`;
const findUserWithNicknameQuery = `MATCH (user:User) WHERE user.nickname=~{nickname} RETURN user`;
const findUserAndRelationByNicknameWithoutMeQuery = `MATCH (user:User {email: {email}})<-[r:REQUEST_FRIEND]-(target: User)
WHERE target.nickname=~ {nickname} AND target.email <> {email} AND r is not null
RETURN "REQUESTED_FROM" as type, target
UNION ALL
MATCH (target: User)
WHERE target.nickname=~ {nickname} AND NOT (:User {email: {email}})-[:REQUEST_FRIEND]-(target) AND target.email <> {email} 
RETURN "NONE" as type, target
UNION ALL
MATCH (user:User {email: {email}})-[r:REQUEST_FRIEND]->(target: User)
WHERE target.nickname=~ {nickname} AND target.email <> {email} AND r is not null
RETURN "REQUEST" as type, target`;

export {
  findUserWithEmailQuery,
  findUserWithNicknameQuery,
  findUserAndRelationByNicknameWithoutMeQuery
};
