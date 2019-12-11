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
RETURN COLLECT(distinct 
  { createAt: m.createAt, content: m.content, 
    thumbnail: u.thumbnail, email: u.email, nickname: u.nickname,
    chatRoomId: ID(c)
  })
as chat
`;

export const CHECK_CHAT_ROOM_QUERY = `
MATCH (c:ChatRoom) <- [:JOIN] - (user1:User),
      (c) <- [:JOIN] - (user2: User)
WHERE user1.email = $userEmail1 and user2.email = $userEmail2
RETURN ID(c) as chatRoomId
`;

export const GET_CHATS_QUERY = `
MATCH (c:ChatRoom) <- [:SEND] - (chat:Chat) <- [:HAS] - (u:User)
WITH c, chat, u
ORDER BY chat.createAt DESC 
WHERE (u.email = $userEmail1 or u.email = $userEmail2)
      and chat.createAt < datetime($cursor)
RETURN COLLECT(distinct 
    { createAt: chat.createAt, content: chat.content, 
      thumbnail: u.thumbnail, email: u.email, nickname: u.nickname,
      chatRoomId: ID(c)
    })
as chats
LIMIT $limit;
`;

export const GET_CHATS_BY_CHAT_ROOM_ID_QUERY = `
MATCH (c:ChatRoom) <- [:SEND] - (chat:Chat) <- [:HAS] - (u:User)
WITH c, chat, u
ORDER BY chat.createAt DESC 
LIMIT $limit
WHERE ID(c) = $chatRoomId and chat.createAt < datetime($cursor)
RETURN COLLECT(distinct 
    { createAt: chat.createAt, content: chat.content, 
      thumbnail: u.thumbnail, email: u.email, nickname: u.nickname,
      chatRoomId: ID(c)
    })
as chats;
`;

export const GET_CHATROOMS_QUERY = `
MATCH (chatRoom:ChatRoom) <- [:JOIN] - (otherUser:User),
      (chatRoom) <- [:SEND] - (chat:Chat) <- [:HAS] - (user:User)
WITH chatRoom, otherUser, chat, user
ORDER BY chat.createAt desc
WHERE NOT(otherUser.email = $email) and chat.createAt < dateTime($cursor)
RETURN otherUser, [HEAD(COLLECT(distinct {content: chat.content, createAt: chat.createAt, 
	  email: user.email, thumbnail: user.thumbnail, nickname: user.nickname, chatRoomId: ID(chatRoom)}))] as lastChat
LIMIT $limit;
`;

export const GET_USERS_ON_CHAT_ROOM_QUERY = `
MATCH (c:ChatRoom) <- [:JOIN] - (u:User)
WHERE ID(c) = {chatRoomId}
RETURN COLLECT(distinct u) as users;
`;
