import React, { Dispatch, ReactNode } from 'react';
import { useReducer } from 'react';
import { createContext } from 'react';
import { useContext } from 'react';

interface IChatRoom {
  chatType: string;
  chatRoomId?: number;
  nickname?: string;
  thumbnail?: string;
  otherUserEmail?: string;
}

const initState: IChatRoom[] = [];

type IChatRoomState = IChatRoom[];

type Action =
  | { type: 'CREATE_CHATROOM'; chatRoom: IChatRoom }
  | { type: 'DELETE_CHATROOM'; idx: number };

type IChatRoomDispatch = Dispatch<Action>;

const ChatRoomState = createContext<IChatRoom[] | undefined>(undefined);
const ChatRoomDispatch = createContext<IChatRoomDispatch | undefined>(
  undefined
);

interface IExistChatRoom {
  state: IChatRoom[];
  chatRoomId: number;
}

const existChatRoom = ({ state, chatRoomId }: IExistChatRoom): boolean =>
  state.some((chatRoom: IChatRoom) => chatRoom.chatRoomId === chatRoomId);

const ChatRoomReducer = (
  state: IChatRoomState,
  action: Action
): IChatRoomState => {
  switch (action.type) {
    case 'CREATE_CHATROOM':
      const {
        chatRoom: { chatRoomId }
      } = action;
      if (chatRoomId && existChatRoom({ state, chatRoomId })) {
        return state;
      }
      return [...state, action.chatRoom];
    case 'DELETE_CHATROOM':
      return state.filter((_, idx) => idx !== action.idx);
    default:
      throw new Error('Unhandled action');
  }
};

export function ChatRoomProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(ChatRoomReducer, initState);
  return (
    <ChatRoomDispatch.Provider value={dispatch}>
      <ChatRoomState.Provider value={state}>{children}</ChatRoomState.Provider>
    </ChatRoomDispatch.Provider>
  );
}

export const useChatRoomState = () => {
  const state = useContext(ChatRoomState);
  if (!state) {
    throw new Error('cannot find ChatRoom Provider');
  }
  return state;
};

export const useChatRoomDispatch = () => {
  const dispatch = useContext(ChatRoomDispatch);
  if (!dispatch) {
    throw new Error('cannot find ChatRoom Provider');
  }
  return dispatch;
};
