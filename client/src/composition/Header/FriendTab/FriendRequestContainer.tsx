import React from 'react';
import ButtonContainer from 'composition/Header/FriendTab/ButtonContainer';
import { useEffect } from 'react';
import FriendBox from './FriendBox';
import { ALARM_SUBSCRIPTION } from './friend.query';
import uuid from 'uuid';
import { useRequestAlarmQuery } from 'react-components.d';
import { useHeaderTabCountDispatch } from 'stores/HeaderTabCountContext';

interface IUser {
  nickname: string;
  email: string;
  thumbnail: string;
}

interface IrequestAlarm {
  requestAlarm: [IUser];
}

function FriendRequestContainer() {
  const { subscribeToMore, data, loading }: any = useRequestAlarmQuery();
  const headerTabCountDispatch = useHeaderTabCountDispatch();

  useEffect(() => {
    subscribeToMore({
      document: ALARM_SUBSCRIPTION,
      updateQuery: (prev: IrequestAlarm, { subscriptionData }: any) => {
        if (!subscriptionData.data) return prev;
        const newAlarmItem = subscriptionData.data.requestAlarmAdded;

        headerTabCountDispatch({
          type: 'ADD_FRIEND_CNT',
          key: { id: 'friendCount', value: 1 }
        });

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
