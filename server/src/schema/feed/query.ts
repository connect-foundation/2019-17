/* export const MATCH_FEEDS = `MATCH (searchUser:User)-[:AUTHOR]->(feed:Feed)
OPTIONAL MATCH (likeUser:User)-[like:LIKE]->(feed)
OPTIONAL MATCH (feed)-[:HAS]->(com:Comment)
OPTIONAL MATCH (feed)<-[:HAS]-(img:Image)
WITH searchUser, feed, COLLECT(DISTINCT likeUser) AS cp , com, COLLECT(DISTINCT img) as imgs
ORDER BY com.createdAt 
where feed.createdAt <  datetime({cursor})
RETURN searchUser , feed,  ID(feed) as feedId , length(cp) AS totallikes, imgs as imglist,
length(filter(x IN cp WHERE x.email= {useremail} )) AS hasLiked, COLLECT(com) as comments
order by feed.createdAt desc
LIMIT {first} 
`; */

export const MATCH_FEEDS = `MATCH (searchUser:User)-[:AUTHOR]->(feed:Feed)
OPTIONAL MATCH (likeUser:User)-[like:LIKE]->(feed)
OPTIONAL MATCH (feed)-[:HAS]->(com:Comment)<-[:AUTHOR]-(w:User)
OPTIONAL MATCH (feed)<-[:HAS]-(img:Image)
WITH searchUser, feed, COLLECT(DISTINCT likeUser) AS cp , com, COLLECT(DISTINCT img) as imgs, w
ORDER BY com.createdAt 
where feed.createdAt <  datetime({cursor})
RETURN searchUser , feed,  ID(feed) as feedId , length(cp) AS totallikes, imgs as imglist,
length(filter(x IN cp WHERE x.email= {useremail} )) AS hasLiked,  
case when  com is not null then COLLECT(DISTINCT {content:com.content , createdAt:com.createdAt ,nickname:w.nickname , thumbnail: w.thumbnail}) else [] end as comments
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

export const GET_NEW_FEED = `MATCH (searchUser:User)-[:AUTHOR]->(feed:Feed)
OPTIONAL MATCH (likeUser:User)-[like:LIKE]->(feed)
OPTIONAL MATCH (feed)-[:HAS]->(com:Comment)
OPTIONAL MATCH (feed)<-[:HAS]-(img:Image)
WITH searchUser, feed, COLLECT(DISTINCT likeUser) AS cp , COLLECT(com) as comments, COLLECT(DISTINCT img) as imgs
where ID(feed) = {feedId}
RETURN searchUser , feed,  ID(feed) as feedId , length(cp) AS totallikes, imgs as imglist,
length(filter(x IN cp WHERE x.email= {useremail} )) AS hasLiked, comments
order by feed.createdAt desc
`;

export const GET_FRIENDS = `MATCH (searchUser:User)<-[:FRIEND]->(friend:User)
where searchUser.email = {userEmail} and friend.email = {friendEmail}
with collect(friend) as t
return length(t) as isFriend`;

export const WRITING_FEED_QUERY = `MATCH (u:User)
                                   WHERE u.email = $email
                                  CREATE (f:Feed {content: $content, createdAt: datetime()}) 
                                  CREATE (u)-[r:AUTHOR]->(f)
                                  RETURN f`;

export const createImageNodeAndRelation = (idx, Location) =>
  `CREATE (i${idx}:Image {url: '${Location}'}) CREATE (i${idx})-[:HAS]->(f) `;

export const WRITE_COMMENT = `MATCH (f:Feed), (u:User{email:{userEmail} })
WHERE ID(f) = {feedId} 
CREATE (c:Comment {content: {content} ,createdAt: datetime()}) 
CREATE (f)-[r:HAS]->(c)
CREATE (u)-[wr:AUTHOR]->(c)`;
