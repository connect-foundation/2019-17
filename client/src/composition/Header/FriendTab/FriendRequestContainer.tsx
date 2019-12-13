import React from 'react';
import ButtonContainer from 'composition/Header/FriendTab/ButtonContainer';
import { useEffect } from 'react';
import FriendBox from './FriendBox';
import { ALARM_SUBSCRIPTION, GET_REC_ALARM } from './friend.query';
import { useRequestAlarmQuery, FriendAlarmUser } from 'react-components.d';
import { useHeaderTabCountDispatch } from 'stores/HeaderTabCountContext';
import client from 'apollo/ApolloClient';
import { immutableSplice } from 'utils/immutable';
import { IRequestAlarm, ISubscription } from 'schema/Header/friendTab';

function removeDuplicationFromRecommendList(newAlarmItem: FriendAlarmUser) {
  const recommendAlarm = client.readQuery({ query: GET_REC_ALARM })
    .recommendAlarm;

  const idx = recommendAlarm.findIndex(
    (alarm: FriendAlarmUser) => alarm.email === newAlarmItem.email
  );

  if (idx !== -1) {
    client.writeQuery({
      query: GET_REC_ALARM,
      data: {
        recommendAlarm: immutableSplice(idx, recommendAlarm)
      }
    });
  }
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

          removeDuplicationFromRecommendList(newAlarmItem);

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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subscribeToMore]);

  return (
    <>
      {!loading &&
        data.requestAlarm.map(
          ({ nickname, email, thumbnail }: FriendAlarmUser) => (
            <FriendBox nickname={nickname} key={email} imageUrl={thumbnail}>
              <ButtonContainer email={email} />
            </FriendBox>
          )
        )}
    </>
  );
}

export default FriendRequestContainer;
