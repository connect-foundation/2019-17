import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import UserCard from 'components/UserCard';
import ButtonContainer from 'composition/Search/ButtonContainer';
import { useEffect } from 'react';

const GET_REQ_ALARM = gql`
  query requestAlarm {
    requestAlarm {
      nickname
      email
      thumbnail
    }
  }
`;

const ALARM_SUBSCRIPTION = gql`
  subscription requestAlarmAdded {
    requestAlarmAdded {
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

interface IrequestAlarm {
  requestAlarm: [IUser];
}

function FriendRequestContainer() {
  const { subscribeToMore, data, loading, error }: any = useQuery(
    GET_REQ_ALARM
  );

  useEffect(() => {
    subscribeToMore({
      document: ALARM_SUBSCRIPTION,
      updateQuery: (prev: IrequestAlarm, { subscriptionData }: any) => {
        if (!subscriptionData.data) return prev;
        const newAlarmItem = subscriptionData.data.requestAlarmAdded;

        return Object.assign({}, prev, {
          requestAlarm: [newAlarmItem, ...prev.requestAlarm]
        });
      }
    });
  }, [subscribeToMore]);

  if (loading) return <p>loading</p>;
  if (error) return <p>{JSON.stringify(error)}</p>;

  return (
    <>
      {data.requestAlarm.map(({ nickname, email, thumbnail }: IUser) => (
        <UserCard nickname={nickname} key={email} imageUrl={thumbnail}>
          <ButtonContainer email={email} initialRelation="REQUESTED_FROM" />
        </UserCard>
      ))}
    </>
  );
}

export default FriendRequestContainer;
