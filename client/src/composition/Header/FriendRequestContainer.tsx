import React from 'react';
import styled from 'styled-components';
import { useQuery, useSubscription } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import UserCard from 'components/UserCard';
import ButtonContainer from 'composition/Search/ButtonContainer';

const GET_REQ_ALARM = gql`
  query getReqAlarm {
    getReqAlarm {
      nickname
      email
      thumbnail
    }
  }
`;

const ALARM_SUBSCRIPTION = gql`
  subscription friendAlarmAdded {
    friendAlarmAdded {
      nickname
      email
      thumbnail
    }
  }
`;

interface IUser {
  nickname: string;
  email: string;
  thumbnail: string;
}

const Header = styled.div`
  color: black;
`;

function FriendRequestContainer() {
  const { data: data1, loading, error }: any = useQuery(GET_REQ_ALARM);
  const {
    data: data2,
    loading: loading2,
    error: error2
  }: any = useSubscription(ALARM_SUBSCRIPTION);

  if (loading) return <p>loading</p>;
  if (error) return <p>{JSON.stringify(error)}</p>;

  return (
    <>
      <Header>
        {data1.getReqAlarm.map(({ nickname, email, thumbnail }: IUser) => (
          <UserCard nickname={nickname} key={email} imageUrl={thumbnail}>
            <ButtonContainer email={email} initialRelation="REQUESTED_FROM" />
          </UserCard>
        ))}
      </Header>
    </>
  );
}

export default FriendRequestContainer;
