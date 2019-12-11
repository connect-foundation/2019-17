import React from 'react';
import ButtonContainer from 'composition/Search/ButtonContainer';
import FriendBox from './FriendBox';

interface IUser {
  nickname: string;
  email: string;
  thumbnail: string;
}

interface IProps {
  recommendAlarm: [IUser];
}

function FriendRecommendContainer({ recommendAlarm }: IProps) {
  return (
    <>
      {recommendAlarm &&
        recommendAlarm.map(({ nickname, email, thumbnail }: IUser) => (
          <FriendBox nickname={nickname} key={email} imageUrl={thumbnail}>
            <ButtonContainer email={email} initialRelation="NONE" />
          </FriendBox>
        ))}
    </>
  );
}

export default FriendRecommendContainer;
