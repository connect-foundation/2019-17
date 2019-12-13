import React from 'react';
import ButtonContainer from 'composition/Search/ButtonContainer';
import FriendBox from './FriendBox';
import { useRecommendAlarmQuery } from 'react-components.d';

interface IUser {
  nickname: string;
  email: string;
  thumbnail: string;
}

function FriendRecommendContainer() {
  const { data }: any = useRecommendAlarmQuery();

  return (
    <>
      {data &&
        data.recommendAlarm &&
        data.recommendAlarm.map(({ nickname, email, thumbnail }: IUser) => (
          <FriendBox nickname={nickname} key={email} imageUrl={thumbnail}>
            <ButtonContainer email={email} initialRelation="NONE" />
          </FriendBox>
        ))}
    </>
  );
}

export default FriendRecommendContainer;
