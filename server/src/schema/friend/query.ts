const createRelationWithEmailQuery = `MATCH (a: User {email: {email}}), (b: User {email: {targetEmail}})
MERGE (a)-[r: REQUEST_FRIEND]->(b)
`;

export { createRelationWithEmailQuery };
