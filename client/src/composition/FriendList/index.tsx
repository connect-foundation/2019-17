import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { IFriend } from './friend.type';
import User from '../../components/User';
import { updateUserState } from 'apollo/resolvers';

const Wrapper = styled.div`
  right: 0;
  top: 0;
  height: 100%;
  width: 205px;
  position: fixed;
  z-index: 300;
`;

const Top = styled.div`
  height: 43px;
`;

const friends = gql`
  query getFriends {
    friends {
      email
      nickname
      thumbnail
      status
    }
  }
`;

const FriendList: React.FC = () => {
  const { loading, data, subscribeToMore } = useQuery(friends);
  subscribeToMore({
    document: updateUserState,
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
        data.friends.map((user: IFriend) => {
          const { email, thumbnail, nickname, status } = user;
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
