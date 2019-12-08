const sendFriendRequestByEmailQuery = `MATCH (a: User {email: {email}}), (b: User {email: {targetEmail}})
MERGE (a)-[r: REQUEST_FRIEND]->(b)`;
const acceptFriendRequestByEmailQuery = `MATCH (a:User {email: {email}})-[r:REQUEST_FRIEND]-(b:User {email: {targetEmail}}) delete r
merge (a)<-[r2:FRIEND]-(b)
return a, r2, b`;
const cancelFriendRequestByEmailQuery = `MATCH (a:User {email: {email}})-[r:REQUEST_FRIEND]-(b:User {email: {targetEmail}}) delete r`;
const cancelFriendByEmailQuery = `MATCH (a:User {email: {email}})-[r:FRIEND]-(b:User {email: {targetEmail}}) delete r`;
const findUserByRequestRelation = `match(: User {email: {email}})<-[r:REQUEST_FRIEND]-(u: User) return u`;
const findUserByNoRelation = `MATCH(u: User {email: {email}})-[:FRIEND]-(:User)-[:FRIEND]-(target: User)
where target.email <> {email} And not (u)-[]-(target)
return target`;

export {
  sendFriendRequestByEmailQuery,
  acceptFriendRequestByEmailQuery,
  cancelFriendRequestByEmailQuery,
  cancelFriendByEmailQuery,
  findUserByRequestRelation,
  findUserByNoRelation
};
