import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import ButtonContainer from 'composition/Header/FriendTab/ButtonContainer';
import { useEffect } from 'react';
import FriendBox from './FriendBox';
import uuid from 'uuid';

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
  const { subscribeToMore, data, loading }: any = useQuery(GET_REQ_ALARM);

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

  return (
    <>
      {!loading &&
        data.requestAlarm.map(({ nickname, email, thumbnail }: IUser) => (
          <FriendBox nickname={nickname} key={uuid()} imageUrl={thumbnail}>
            <ButtonContainer email={email} />
          </FriendBox>
        ))}
    </>
  );
}

export default FriendRequestContainer;
