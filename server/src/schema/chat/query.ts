export const CREATE_CHAT_ROOM_QUERY = `
MATCH (user1:User {email: $from}), (user2:User {email: $to})
CREATE (c:ChatRoom) <- [:JOIN] - (user1)
CREATE (c) <- [:JOIN] - (user2)
CREATE (c) <- [:SEND] - (m:Chat {content: $content, createAt: datetime()}) <- [:HAS] - (user1)
RETURN COLLECT(distinct 
    { createAt: m.createAt, content: m.content, 
      thumbnail: user1.thumbnail, email: user1.email, nickname: user1.nickname,
      chatRoomId: ID(c)
    })
as chats
`;

export const CREATE_CHAT_QUERY = `
MATCH (c:ChatRoom) WHERE ID(c) = $chatRoomId
MATCH (u:User {email: $email})
CREATE (c) <- [:SEND] - (m:Chat {content: $content, createAt: datetime()}) <- [:HAS] - (u)
`;

export const CHECK_CHAT_ROOM = `
MATCH (c:ChatRoom) <- [:JOIN] - (user1:User),
      (c) <- [:JOIN] - (user2: User)
WHERE user1.email = $userEmail1 and user2.email = $userEmail2
RETURN c as chatRoom
`;

