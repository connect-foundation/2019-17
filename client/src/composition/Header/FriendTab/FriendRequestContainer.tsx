import React from 'react';
import ButtonContainer from 'composition/Header/FriendTab/ButtonContainer';
import { useEffect } from 'react';
import FriendBox from './FriendBox';
import { ALARM_SUBSCRIPTION, GET_REC_ALARM } from './friend.query';
import uuid from 'uuid';
import { useRequestAlarmQuery } from 'react-components.d';
import { useHeaderTabCountDispatch } from 'stores/HeaderTabCountContext';
import client from 'apollo/ApolloClient';

interface IUser {
  nickname: string;
  email: string;
  thumbnail: string;
  action: string;
}

interface IRequestAlarm {
  requestAlarm: [IUser];
}

interface ISubscription {
  subscriptionData: IData;
}

interface IData {
  data: IReqAdded;
}

interface IReqAdded {
  requestAlarmAdded: IUser;
}

function immutableSplice<T>(idx: number, arr: [T]) {
  return [...arr.slice(idx + 1), ...arr.slice(0, idx - 1)];
}

function FriendRequestContainer() {
  const { subscribeToMore, data, loading }: any = useRequestAlarmQuery();
  const headerTabCountDispatch = useHeaderTabCountDispatch();

  useEffect(() => {
    subscribeToMore({
      document: ALARM_SUBSCRIPTION,
      updateQuery: (
        prev: IRequestAlarm,
        { subscriptionData: { data } }: ISubscription
      ) => {
        if (!data) return prev;

        const { requestAlarmAdded: newAlarmItem } = data;

        if (newAlarmItem.action === 'ADDED') {
          headerTabCountDispatch({
            type: 'ADD_FRIEND_CNT',
            key: { id: 'friendCount', value: 1 }
          });

          const recommendAlarm = client.readQuery({ query: GET_REC_ALARM })
            .recommendAlarm;

          const idx = recommendAlarm.findIndex(
            (alarm: IUser) => alarm.email === newAlarmItem.email
          );

          if (idx !== -1) {
            client.writeQuery({
              query: GET_REC_ALARM,
              data: {
                recommendAlarm: immutableSplice(idx, recommendAlarm)
              }
            });
          }

          return Object.assign({}, prev, {
            requestAlarm: [newAlarmItem, ...prev.requestAlarm]
          });
        } else {
          headerTabCountDispatch({
            type: 'ADD_FRIEND_CNT',
            key: { id: 'friendCount', value: -1 }
          });

          const idx = prev.requestAlarm.findIndex(
            alarm => alarm.email === newAlarmItem.email
          );

          return Object.assign({}, prev, {
            requestAlarm: immutableSplice(idx, prev.requestAlarm)
          });
        }
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
