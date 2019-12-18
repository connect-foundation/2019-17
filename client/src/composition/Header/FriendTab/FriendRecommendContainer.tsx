import React from 'react';
import ButtonContainer from 'composition/Search/ButtonContainer';
import FriendBox from './FriendBox';
import { useRecommendAlarmQuery, FriendAlarmUser } from 'react-components.d';

function FriendRecommendContainer() {
  const { data }: any = useRecommendAlarmQuery();

  return (
    <>
      {data &&
        data.recommendAlarm &&
        data.recommendAlarm.map(
          ({ nickname, email, thumbnail }: FriendAlarmUser) => (
            <FriendBox
              nickname={nickname}
              key={email}
              imageUrl={thumbnail || undefined}>
              <ButtonContainer email={email} initialRelation="NONE" />
            </FriendBox>
          )
        )}
    </>
  );
}

export default FriendRecommendContainer;
