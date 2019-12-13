import React from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { IFriend } from './friend.type';
import User from '../../components/User';
import { useQuery } from '@apollo/react-hooks';

const Wrapper = styled.div`
  right: 0;
  top: 0;
  height: 100%;
  width: 205px;
  position: fixed;
  z-index: 300;
  border-left: 1px solid #ccc;
`;

const Top = styled.div`
  height: 43px;
`;

export const GET_FRIENDS_STATUS = gql`
  query getFriends {
    friends {
      email
      nickname
      thumbnail
      status
    }
  }
`;

export const UPDATE_USER_STATE = gql`
  subscription updateUserState {
    updateUserState {
      email
      nickname
      thumbnail
      status
    }
  }
`;

const FriendList: React.FC = () => {
  const { loading, data, subscribeToMore } = useQuery(GET_FRIENDS_STATUS);
  subscribeToMore({
    document: UPDATE_USER_STATE,
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev;
      const {
        data: { updateUserState: newUser }
      } = subscriptionData;
      return Object.assign({}, prev, {
        friends: [
          newUser,
          ...prev.friends.filter((e: any) => e.email !== newUser.email)
        ]
      });
    }
  });
  return (
    <Wrapper>
      <Top />
      {!loading &&
        data &&
        data.friends.map(({ email, thumbnail, nickname, status }: IFriend) => {
          return (
            <User
              key={email}
              email={email}
              thumbnail={thumbnail ? thumbnail : undefined}
              nickname={nickname}
              status={status}
            />
          );
        })}
    </Wrapper>
  );
};

export default FriendList;
