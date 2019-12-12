import gql from 'graphql-tag';

export const GET_CHATS = gql`
  query getChatsByChatRoomId($chatRoomId: Int!) {
    getChatsByChatRoomId(chatRoomId: $chatRoomId) {
      content
      chatRoomId
      nickname
      thumbnail
      email
    }
  }
`;

export const CREATE_CHAT = gql`
  mutation createChat($chatRoomId: Int!, $content: String!) {
    createChat(chatRoomId: $chatRoomId, content: $content)
  }
`;

export const GET_CHAT_SUBSCRIPTION = gql`
  subscription getChat($chatRoomId: Int!) {
    getChatsByChatRoomId(chatRoomId: $chatRoomId) {
      content
      chatRoomId
      nickname
      thumbnail
      email
    }
  }
`;

export const CREATE_CHAT_ROOM_MUTATION = gql`
  mutation createChatRoom($userEmail: String!, $content: String!) {
    createChatRoom(userEmail: $userEmail, content: $content) {
      chatRoomId
    }
  }
`;

export const GET_USER_BY_EMAIL_QUERY = gql`
  query getUser($email: String!) {
    getUser(email: $email) {
      nickname
      thumbnail
    }
  }
`;
