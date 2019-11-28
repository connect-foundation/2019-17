const findUserWithEmailQuery = `MATCH (user:User {email: {email}}) RETURN user`;
export { findUserWithEmailQuery };
