import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetUserInfoByEmailQuery } from 'react-components.d';
import TimelineBody from './Body';
import TimelineHeader from './Header';
import styled from 'styled-components';

const ContentArea = styled.div`
  position: relative;
  width: 851px;
  outline: none;
  word-wrap: break-word;
`;

function MyPage() {
  const { email = '' } = useParams();
  const {
    data: { user = null, friends = [], me = null, relation = null } = {},
    loading
  } = useGetUserInfoByEmailQuery({
    variables: { email },
    fetchPolicy: 'cache-and-network'
  });

  if (loading) return <></>;

  const userNickname = (user && user.nickname) || '';
  const userEmail = (user && user.email) || '';
  const userResidence = (user && user.residence) || '';
  const userHometown = (user && user.hometown) || '';
  const userThumbnail = (user && user.thumbnail) || undefined;
  const myEmail = (me && me.email) || '';
  const relationBetweenUserAndMe = relation || '';

  return (
    <>
      <ContentArea>
        <TimelineHeader
          userEmail={userEmail}
          userThumbnail={userThumbnail}
          userNickname={userNickname}
          myEmail={myEmail}
          relationBetweenUserAndMe={relationBetweenUserAndMe}
        />
        <TimelineBody
          userResidence={userResidence}
          userHometown={userHometown}
          friends={friends}
          userEmail={userEmail}
        />
      </ContentArea>
    </>
  );
}

export default MyPage;
