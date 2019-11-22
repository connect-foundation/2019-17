const MATCH_NEW_FEEDS = `MATCH (a:User { email: 'abc@naver.com' })-[:AUTHOR]->(f:Feed)
where f.createdAt <  datetime({cursor})
RETURN a.nickname as nickname, a.thumbnail as thumbnail ,
f.content as content ,apoc.convert.toString(f.createdAt)  as createdAt 
LIMIT {first} `;
export { MATCH_NEW_FEEDS };
