export const SEND_FRIEND_REQUEST_BY_EMAIL = `MATCH (a: User {email: {email}}), (b: User {email: {targetEmail}})
MERGE (a)-[r: REQUEST_FRIEND {isRead: false}]->(b)`;
export const ACCEPT_FRIEND_REQUEST_BY_EMAIL = `MATCH (a:User {email: {email}})-[r:REQUEST_FRIEND]-(b:User {email: {targetEmail}}) delete r
merge (a)<-[r2:FRIEND]-(b)
return a, r2, b`;
export const CANCEL_FRIEND_REQUEST_BY_EMAIL = `MATCH (a:User {email: {email}})-[r:REQUEST_FRIEND]-(b:User {email: {targetEmail}}) delete r`;
export const CANCEL_FRIEND_BY_EMAIL = `MATCH (a:User {email: {email}})-[r:FRIEND]-(b:User {email: {targetEmail}}) delete r`;
export const REJECT_FRIEND_REQUEST_BY_EMAIL = `MATCH (a:User {email: {email}})<-[r:REQUEST_FRIEND]-(b:User {email: {targetEmail}}) delete r`;

export const FIND_USER_BY_REQUEST_RELATION = `match(: User {email: {email}})<-[r:REQUEST_FRIEND]-(u: User) return u`;
export const FIND_USER_BY_NO_RELATION = `MATCH(u: User {email: {email}})-[:FRIEND]-(:User)-[:FRIEND]-(target: User)
where target.email <> {email} And not (u)-[]-(target)
return target`;

export const CHANGE_ALL_REQUEST_READ_STATE_BY_EMAIL = `
MATCH (a: User)-[r: REQUEST_FRIEND]->(b: User {email: {email}})
SET r.isRead = true
`;
export const COUNT_UNREAD_REQUEST_BY_EMAIL = `
Match(:User {email: {email}})<-[r:REQUEST_FRIEND {isRead: false}]-(:User)
return count(r)`;
