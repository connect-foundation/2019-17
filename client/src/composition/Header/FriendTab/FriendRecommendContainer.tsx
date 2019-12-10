import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import UserCard from 'components/UserCard';
import ButtonContainer from 'composition/Search/ButtonContainer';
import FriendBox from './FriendBox';

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
  const { data, loading }: any = useQuery(GET_REC_ALARM);

  return (
    <>
      {!loading &&
        data.recommendAlarm.map(({ nickname, email, thumbnail }: IUser) => (
          <FriendBox nickname={nickname} key={email} imageUrl={thumbnail}>
            <ButtonContainer email={email} initialRelation="NONE" />
          </FriendBox>
        ))}
    </>
  );
}

export default FriendRecommendContainer;
