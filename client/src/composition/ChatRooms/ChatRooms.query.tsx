import gql from 'graphql-tag';

export const GET_CHATS = gql`
  query getChatsByChatRoomId($chatRoomId: Int!) {
    getChatsByChatRoomId(chatRoomId: $chatRoomId) {
      content
      createAt {
        minute
      }
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
