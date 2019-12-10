import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import UserCard from 'components/UserCard';
import ButtonContainer from 'composition/Search/ButtonContainer';

const GET_REC_ALARM = gql`
  query recommendAlarm {
    recommendAlarm {
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

function FriendRecommendContainer() {
  const { data, loading, error }: any = useQuery(GET_REC_ALARM);

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
