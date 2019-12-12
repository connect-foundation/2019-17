export const FIND_USER_WITH_EMAIL_QUERY = `MATCH (user:User {email: {email}}) RETURN user`;
export const FIND_USER_WITH_NICKNAME_QUERY = `MATCH (user:User) WHERE user.nickname=~{nickname} RETURN user`;
export const FIND_FRIENDS_QUERY = `MATCH (user:User {email: {email}})-[:FRIEND]-(friends:User) RETURN friends`;
export const CHECK_FRIEND_QUERY = `MATCH (user:User {email: {email}})-[:FRIEND]-(friend:User {email: {friendEmail}}) RETURN friend`;
export const FIND_USER_AND_RELATION_BY_NICKNAME_WITHOUT_ME_QUERY = `MATCH (user:User {email: {email}})<-[r:REQUEST_FRIEND]-(target: User)
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

export const GET_USER_BY_EMAIL_QUERY = `
MATCH (u:User {email: $email})
RETURN u as user;
`;
