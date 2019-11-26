const MATCH_NEW_FEEDS = `MATCH (user:User { email: 'abc@naver.com' })-[:AUTHOR]->(feed:Feed)
where feed.createdAt <  datetime({cursor})
RETURN user.nickname as nickname, user.thumbnail as thumbnail ,
feed.content as content ,apoc.convert.toString(feed.createdAt)  as createdAt 
LIMIT {first} `;
export { MATCH_NEW_FEEDS };
