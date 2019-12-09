import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import UserCard from 'components/UserCard';
import ButtonContainer from 'composition/Search/ButtonContainer';
import { useEffect } from 'react';

const GET_REC_ALARM = gql`
  query recommendAlarm {
    recommendAlarm {
      nickname
      email
      thumbnail
    }
  }
`;

const ALARM_SUBSCRIPTION = gql`
  subscription recommendAlarmAdded {
    recommendAlarmAdded {
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

interface IrecommendAlarm {
  recommendAlarm: [IUser];
}

function FriendRecommendContainer() {
  const { subscribeToMore, data, loading, error }: any = useQuery(
    GET_REC_ALARM
  );

  useEffect(() => {
    subscribeToMore({
      document: ALARM_SUBSCRIPTION,
      updateQuery: (prev: IrecommendAlarm, { subscriptionData }: any) => {
        if (!subscriptionData.data) return prev;
        const newAlarmItem = subscriptionData.data.recommendAlarmAdded;

        return Object.assign({}, prev, {
          recommendAlarm: [newAlarmItem, ...prev.recommendAlarm]
        });
      }
    });
  }, [subscribeToMore]);

  if (loading) return <p>loading</p>;
  if (error) return <p>{JSON.stringify(error)}</p>;

  return (
    <>
      {data.recommendAlarm.map(({ nickname, email, thumbnail }: IUser) => (
        <UserCard nickname={nickname} key={email} imageUrl={thumbnail}>
          <ButtonContainer email={email} initialRelation="NONE" />
        </UserCard>
      ))}
    </>
  );
}

export default FriendRecommendContainer;
