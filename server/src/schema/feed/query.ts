const MATCH_FEEDS = `MATCH (searchUser:User)-[:AUTHOR]->(feed:Feed)
OPTIONAL MATCH (likeUser:User)-[:LIKE]->(feed)
OPTIONAL MATCH (feed)-[:HAS]->(com:Comment)
WITH searchUser, feed, COLLECT(likeUser) AS cp , COLLECT(com) as comments
where feed.createdAt <  datetime({cursor})
RETURN searchUser , feed,  ID(feed) as feedId , length(cp) AS totallikes,
length(filter(x IN cp WHERE x.email='vantovan7414@gmail.com')) AS hasLiked, comments
order by feed.createdAt desc
LIMIT {first} 
`;

const UPDATE_LIKE = `
MATCH (u:User),(f:Feed)
WHERE u.email = {useremail} AND ID(f) = {feedId}
MERGE (u)-[r:LIKE]->(f)
RETURN type(r)`;

const DELETE_LIKE = `
MATCH (u:User)-[r:LIKE]->(f:Feed)
WHERE u.email = {useremail} AND ID(f) = {feedId}
delete r`;

export { MATCH_FEEDS, UPDATE_LIKE, DELETE_LIKE };
