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

export const MATCH_USER_FEEDS = `MATCH (searchUser:User {email:{useremail}})-[:AUTHOR]->(feed:Feed)
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

export const GET_NEW_FEED = `
MATCH (searchUser:User)-[:AUTHOR]->(feed:Feed)
OPTIONAL MATCH (likeUser:User)-[like:LIKE]->(feed)
OPTIONAL MATCH (feed)-[:HAS]->(com:Comment)<-[:AUTHOR]-(w:User)
OPTIONAL MATCH (feed)<-[:HAS]-(img:Image)
WITH searchUser, feed, COLLECT(DISTINCT likeUser) AS cp , com , COLLECT(DISTINCT img) as imgs, w
where ID(feed) = {feedId}
RETURN searchUser , feed,  ID(feed) as feedId , length(cp) AS totallikes, imgs as imglist,
length(filter(x IN cp WHERE x.email= {userEmail} )) AS hasLiked, 
case when  com is not null then COLLECT(DISTINCT {content:com.content , createdAt:com.createdAt ,nickname:w.nickname , thumbnail: w.thumbnail}) else [] end as comments
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
CREATE (u)-[wr:AUTHOR]->(c)
return ID(c) as ID`;

export const ALARM_NEW_FEED = `
MATCH (searchUser:User)-[:FRIEND]-(friend:User), (f:Feed)
WHERE searchUser.email = {userEmail} and ID(f)={feedId}
MERGE (f)-[al:ALARM{isRead:false, isChecked:false}]->(friend)
return ID(al) as alarmId`;

export const DELETE_ALARM = `
MATCH (f:Feed{ID:{feedId}})-[al:ALARM{isRead:true}]->(fr:User{email:{userEmail}})
delete al
return f, al,fr`;

export const GET_FEED_ARALMS = `
    MATCH (u:User{email:{userEmail}})-[al:ALARM]-(f)
    WHERE f:Comment OR f:Feed
    optional match (f)<-[:AUTHOR]-(w:User) 
    optional match (f)--(test:Feed)
    return collect(
      distinct {createdAt : f.createdAt , 
        content:f.content,
        writer: w.nickname, 
        email:w.email, 
        thumbnail:w.thumbnail,
        isRead: al.isRead, 
        isChecked: al.isChecked, 
        feedId: case head(labels(f)) when 'Comment' then ID(test) else ID(f) end ,
        type: head(labels(f)) })  as alarms
`;

export const GET_NEW_ARALM = `
MATCH (u:User)-[al:ALARM]-(f)
WHERE ID(al)={alarmId} AND (f:Comment OR f:Feed )
optional match (f)<-[:AUTHOR]-(w:User)
return collect(
  distinct {createdAt : f.createdAt , 
    content:f.content,
    writer: w.nickname, 
    email:w.email, 
    thumbnail:w.thumbnail,
    isRead: al.isRead, 
    isChecked: al.isChecked, 
    feedId:ID(f),
    type: head(labels(f)) })  as alarms 
`;

export const CHANGE_ALARM_READSTATE = `
MATCH p=(f)-[r:ALARM]->(u:User{email:{userEmail}}) 
WHERE  ID(f) = {feedId} AND f:Comment OR f:Feed 
SET r.isRead = {isRead}
RETURN p`;

export const CHANGE_ALL_ALARM_READSTATE = `
MATCH p=(f)-[r:ALARM]->(u:User{email:{userEmail}}) 
WHERE f:Comment OR f:Feed 
SET r.isRead = {isRead}
RETURN p`;

export const ALARM_NEW_COMMENT = `
MATCH (searchUser:User)-[:FRIEND]-(friend:User), (c:Comment)
WHERE searchUser.email = {userEmail} and ID(c)={feedId}
MERGE (c)-[al:ALARM{isRead:false, isChecked:false}]->(friend)
return ID(al) as alarmId`;

export const ALARM_ISCHECKED_COUNT = `
MATCH (u:User{email:{userEmail}})-[al:ALARM]-(f)
WHERE al.isChecked = false and ( f:Comment OR f:Feed)
optional match (f)<-[:AUTHOR]-(w:User)
return count(distinct al) as alarmCount`;

export const CHANGE_ALL_ALARM_CHECKSTATE = `
MATCH p=(f)-[r:ALARM]->(u:User{email:{userEmail}}) 
WHERE f:Comment OR f:Feed 
SET r.isChecked = {isCheckd}
RETURN p`;
