export const CREATE_CHAT_ROOM_QUERY = `
MATCH (user1:User {email: $userEmail1})
MATCH (user2:User {email: $userEmail2})
CREATE (c:ChatRoom) <- [:JOIN] - (user1)
CREATE (c) <- [:JOIN] - (user2)
CREATE (c) <- [:SEND] - (m:Chat {content: $content, createAt: datetime()}) <- [:HAS] - (user1)
RETURN COLLECT(distinct 
    { createAt: m.createAt, content: m.content, 
    thumbnail: user1.thumbnail, email: user1.email, nickname: user1.nickname })
as chats
`;


