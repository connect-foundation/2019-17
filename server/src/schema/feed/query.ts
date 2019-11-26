const MATCH_NEW_FEEDS = `MATCH (user:User { email: 'abc@naver.com' })-[:AUTHOR]->(feed:Feed)
where feed.createdAt <  datetime({cursor})
RETURN user.nickname as nickname, user.thumbnail as thumbnail ,
feed.content as content ,apoc.convert.toString(feed.createdAt)  as createdAt 
LIMIT {first} `;

const MATCH_FEEDS = `MATCH (searchUser:User)-[:AUTHOR]->(feed:Feed)
OPTIONAL MATCH (likeUser:User)-[:LIKE]->(feed)
OPTIONAL MATCH (feed)-[:HAS]->(com:Comment)
WITH searchUser, feed, COLLECT(likeUser) AS cp , COLLECT(com) as comments
where feed.createdAt <  datetime({cursor})
RETURN searchUser , feed , length(cp) AS totallikes,
length(filter(x IN cp WHERE x.email='dasom@naver.com')) AS hasLiked, comments
LIMIT {first} `;

const MATCH_NEW_FEEDS2 = `MATCH (user:User { email: 'abc@naver.com' })-[:AUTHOR]->(feed:Feed)
where feed.createdAt <  datetime('9999-12-31T09:29:26.050Z')
RETURN feed`;

export { MATCH_NEW_FEEDS, MATCH_NEW_FEEDS2, MATCH_FEEDS };
