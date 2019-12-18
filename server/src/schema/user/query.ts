export const FIND_USER_BY_EMAIL_QUERY = `MATCH (user:User {email: {email}}) RETURN user`;
export const FIND_FRIENDS_QUERY = `MATCH (user:User {email: {email}})-[:FRIEND]-(friends:User) RETURN friends`;
export const CHECK_FRIEND_QUERY = `MATCH (user:User {email: {email}})-[:FRIEND]-(friend:User {email: {friendEmail}}) RETURN friend`;
export const FIND_RELATIONSHIP_WITH_USER = `
MATCH (user:User {email:{myEmail}})
OPTIONAL MATCH (target:User {email:{userEmail}})
OPTIONAL MATCH (user)-[req:REQUEST_FRIEND]->(target)
OPTIONAL MATCH (user)<-[res:REQUEST_FRIEND]-(target)
OPTIONAL MATCH (user)-[friend:FRIEND]-(target)
RETURN
CASE
WHEN req IS NOT NULL
THEN "REQUEST"
WHEN res IS NOT NULL
THEN "REQUESTED_FROM"
WHEN friend IS NOT NULL
THEN "FRIEND"
ELSE "NONE" END as type`;
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
