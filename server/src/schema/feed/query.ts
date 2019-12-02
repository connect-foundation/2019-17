/* const MATCH_FEEDS1 = `MATCH (searchUser:User)-[:AUTHOR]->(feed:Feed)
OPTIONAL MATCH (likeUser:User)-[:LIKE]->(feed)
OPTIONAL MATCH (feed)-[:HAS]->(com:Comment)
WITH searchUser, feed, COLLECT(DISTINCT likeUser) AS cp , COLLECT(com) as comments
where feed.createdAt <  datetime({cursor})
RETURN searchUser , feed,  ID(feed) as feedId , length(cp) AS totallikes,
length(filter(x IN cp WHERE x.email= {useremail} )) AS hasLiked, comments
order by feed.createdAt desc
LIMIT {first} 
`; */

export const MATCH_FEEDS = `MATCH (searchUser:User)-[:AUTHOR]->(feed:Feed)
OPTIONAL MATCH (likeUser:User)-[like:LIKE]->(feed)
OPTIONAL MATCH (feed)-[:HAS]->(com:Comment)
OPTIONAL MATCH (feed)<-[:HAS]-(img:Image)
WITH searchUser, feed, COLLECT(DISTINCT likeUser) AS cp , COLLECT(com) as comments, COLLECT(DISTINCT img) as imgs
where feed.createdAt <  datetime({cursor})
RETURN searchUser , feed,  ID(feed) as feedId , length(cp) AS totallikes, imgs as imglist,
length(filter(x IN cp WHERE x.email= {useremail} )) AS hasLiked, comments
order by feed.createdAt desc
LIMIT {first} 
`;

export const UPDATE_LIKE = `
MATCH (u:User),(f:Feed)
WHERE u.email = {useremail} AND ID(f) = {feedId}
MERGE (u)-[r:LIKE]->(f)
RETURN type(r)`;

export const DELETE_LIKE = `
MATCH (u:User)-[r:LIKE]->(f:Feed)
WHERE u.email = {useremail} AND ID(f) = {feedId}
delete r`;

export const WRITING_FEED_QUERY = `MATCH (u:User)
                                   WHERE u.email = $email
                                  CREATE (f:Feed {content: $content, createdAt: datetime()}) 
                                  CREATE (u)-[r:AUTHOR]->(f)
                                  RETURN f`;

export const createImageNodeAndRelation = (idx, Location) =>
  `CREATE (i${idx}:Image {url: '${Location}'}) CREATE (i${idx})-[:HAS]->(f) `;

