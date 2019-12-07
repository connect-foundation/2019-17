const findUserWithEmailQuery = `MATCH (user:User {email: {email}}) RETURN user`;
const findUserWithNicknameQuery = `MATCH (user:User) WHERE user.nickname=~{nickname} RETURN user`;
const findFriendsQuery = `MATCH (user:User {email: {email}})-[:FRIEND]-(friends:User) RETURN friends`;
const findUserAndRelationByNicknameWithoutMeQuery = `MATCH (user:User {email: {email}})<-[r:REQUEST_FRIEND]-(target: User)
WHERE target.nickname=~ {nickname} AND target.email <> {email} 
RETURN "REQUESTED_FROM" as type, target
UNION ALL
MATCH (target: User)
WHERE target.nickname=~ {nickname} AND NOT (:User {email: {email}})-[]-(target) AND target.email <> {email} 
RETURN "NONE" as type, target
UNION ALL
MATCH (user:User {email: {email}})-[r:REQUEST_FRIEND]->(target: User)
WHERE target.nickname=~ {nickname} AND target.email <> {email} 
RETURN "REQUEST" as type, target
UNION ALL
MATCH (user:User {email: {email}})-[r:FRIEND]-(target: User)
WHERE target.nickname=~ {nickname} AND target.email <> {email} 
RETURN "FRIEND" as type, target`;

export {
  findFriendsQuery,
  findUserWithEmailQuery,
  findUserWithNicknameQuery,
  findUserAndRelationByNicknameWithoutMeQuery
};
