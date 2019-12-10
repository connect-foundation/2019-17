const SEND_FRIEND_REQUEST_BY_EMAIL_QUERY = `MATCH (a: User {email: {email}}), (b: User {email: {targetEmail}})
MERGE (a)-[r: REQUEST_FRIEND]->(b)`;
const ACCEPT_FRIEND_REQUEST_BY_EMAIL_QUERY = `MATCH (a:User {email: {email}})-[r:REQUEST_FRIEND]-(b:User {email: {targetEmail}}) delete r
merge (a)<-[r2:FRIEND]-(b)
return a, r2, b`;
const CANCEL_FRIEND_REQUEST_BY_EMAIL_QUERY = `MATCH (a:User {email: {email}})-[r:REQUEST_FRIEND]-(b:User {email: {targetEmail}}) delete r`;
const CANCEL_FRIEND_EMAIL_QUERY = `MATCH (a:User {email: {email}})-[r:FRIEND]-(b:User {email: {targetEmail}}) delete r`;

export {
  SEND_FRIEND_REQUEST_BY_EMAIL_QUERY,
  ACCEPT_FRIEND_REQUEST_BY_EMAIL_QUERY,
  CANCEL_FRIEND_REQUEST_BY_EMAIL_QUERY,
  CANCEL_FRIEND_EMAIL_QUERY
};
