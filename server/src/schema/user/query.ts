const findUserWithEmailQuery = `MATCH (user:User {email: {email}}) RETURN user`;
const addUserQuery = `CREATE (user:USER {email: {email}, nickname: {nickname}, hometown: {hometown},
    residence: {residence}, thumbnail: {thumbnail}}) RETURN user`;
export { findUserWithEmailQuery, addUserQuery };
