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
