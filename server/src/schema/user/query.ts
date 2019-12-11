const FIND_USER_WITH_EMAIL_QUERY = `MATCH (user:User {email: {email}}) RETURN user`;
const FIND_USER_WITH_NICKNAME_QUERY = `MATCH (user:User) WHERE user.nickname=~{nickname} RETURN user`;
const FIND_FRIENDS_QUERY = `MATCH (user:User {email: {email}})-[:FRIEND]-(friends:User) RETURN friends`;
const CHECK_FRIEND_QUERY = `MATCH (user:User {email: {email}})-[:FRIEND]-(friend:User {email: {friendEmail}}) RETURN friend`;
const FIND_USER_AND_RELATION_BY_NICKNAME_WITHOUT_ME_QUERY = `MATCH (user:User {email: {email}})<-[r:REQUEST_FRIEND]-(target: User)
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
  CHECK_FRIEND_QUERY,
  FIND_FRIENDS_QUERY,
  FIND_USER_WITH_EMAIL_QUERY,
  FIND_USER_WITH_NICKNAME_QUERY,
  FIND_USER_AND_RELATION_BY_NICKNAME_WITHOUT_ME_QUERY
};
