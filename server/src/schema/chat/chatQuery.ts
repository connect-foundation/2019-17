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
MATCH (c:ChatRoom)
WHERE ID(c) = $chatRoomId
MATCH (u:User {email:$email})
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

export const GET_CHATS_BY_CHAT_ROOM_ID_QUERY = `
MATCH (c:ChatRoom) <- [:SEND] - (chat:Chat) <- [:HAS] - (u:User)
WHERE ID(c) = $chatRoomId and chat.createAt < datetime($cursor)
WITH c, chat, u
ORDER BY chat.createAt DESC 
LIMIT $limit
RETURN COLLECT(distinct 
    { createAt: chat.createAt, content: chat.content, 
      thumbnail: u.thumbnail, email: u.email, nickname: u.nickname,
      chatRoomId: ID(c)
    })
as chats;
`;

export const GET_CHATROOMS_QUERY = `
MATCH (chatRoom:ChatRoom) <- [:JOIN] - (me:User {email: $email})
optional MATCH (chatRoom) <- [:JOIN] - (otherUser:User) where otherUser.email <> $email
optional MATCH (chatRoom) <- [:SEND] - (chat:Chat) <- [:HAS] - (user:User)
WITH chatRoom, chat, me, otherUser, user, collect(distinct [me, otherUser]) as test
ORDER BY chat.createAt desc
WHERE chat.createAt < datetime($cursor)
unwind test as users
return chatRoom, [head(collect(distinct {content: chat.content, createAt: chat.createAt, 
    email: user.email, thumbnail: user.thumbnail, nickname: user.nickname, chatRoomId: ID(chatRoom)}))] as lastChat, users
`;

export const GET_USERS_ON_CHAT_ROOM_QUERY = `
MATCH (c:ChatRoom) <- [:JOIN] - (u:User)
WHERE ID(c) = {chatRoomId}
RETURN COLLECT(distinct u) as users;
`;
