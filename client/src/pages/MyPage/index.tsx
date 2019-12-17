import React from 'react';
import styled from 'styled-components';
import ButtonContainer from 'composition/Search/ButtonContainer';
import { useParams, Link } from 'react-router-dom';

import { PAGE_PATHS } from 'Constants';
import Profile from 'components/Profile';
import ChatRooms from 'composition/ChatRooms';
import ActionButton from 'components/ActionButton';
import { useGetUserInfoWithEmailQuery } from 'react-components.d';
import { FEED_TEXT, FRIEND_TEXT } from './text';
import TimelineBody from './body';

const ContentArea = styled.div`
  position: relative;
  width: 851px;
  outline: none;
  word-wrap: break-word;
`;

const Cover = styled.div`
  display: block;
  position: relative;
`;

const CoverImage = styled.div`
  background-color: #1c1e21;
  background-image: none;
  height: 205px;
`;

const Nickname = styled.div`
  bottom: 12px;
  left: 201px;
  position: absolute;
  color: white;
  font-size: xx-large;
`;

const TimelineHead = styled.div`
  position: relative;
  min-height: 41px;
  width: 100%;
  background-color: #fff;
`;

const ProfileImage = styled.div`
  box-shadow: none;
  height: 160px;
  left: 15px;
  top: -143px;
  width: 160px;
  display: block;
  padding: 1px;
  position: absolute;
  border-radius: 100%;
`;

const Image = styled(Profile)`
  position: relative;
  width: 160px;
  height: 160px;
`;

const StatusWrapper = styled.div`
  position: absolute;
  width: 100%;
`;

const Status = styled.div`
  bottom: 15px;
  padding: 0;
  position: absolute;
  right: 15px;
  float: right;
  max-width: 400px;
  text-align: right;
`;

const AlarmButton = styled(ActionButton)`
  margin-left: 3px;
`;

const TimelineNav = styled.div`
  font-family: inherit;
  clear: right;
  padding-left: 201px;
  width: 649px;
`;

const TimelineNavUl = styled.ul`
  border-left: 1px solid #e9eaed;
  ::after {
    clear: both;
    content: '.';
    display: block;
    font-size: 0;
    height: 0;
    line-height: 0;
    visibility: hidden;
  }
`;

const NavTab = styled(Link)`
  border-right: 1px solid #e9eaed;
  float: left;
  font-size: 14px;
  font-weight: 600;
  height: 40px;
  line-height: 3.05;
  padding: 0 17px;
  position: relative;
  vertical-align: middle;
  white-space: nowrap;
`;

interface IProps {
  UserEmail: string | undefined;
}

const MyPage: React.FC<IProps> = props => {
  const { email = '' } = useParams();
  const {
    data: { user = null, friends = [], me = null, relation = null } = {},
    loading
  } = useGetUserInfoWithEmailQuery({
    variables: { email },
    fetchPolicy: 'cache-and-network'
  });

  if (loading) return <></>;

  const userNickname = user && user.nickname;
  const userEmail = (user && user.email) || '';
  const userResidence = (user && user.residence) || '';
  const userHometown = (user && user.hometown) || '';
  const userThumbnail = (user && user.thumbnail) || undefined;
  const myEmail = me && me.email;
  const relationWithUserAndMe = relation || '';

  return (
    <ContentArea>
      <Cover>
        <CoverImage />
        <Nickname>{userNickname}</Nickname>
      </Cover>
      <TimelineHead>
        <ProfileImage>
          <Image imageUrl={userThumbnail}></Image>
        </ProfileImage>
        {myEmail !== userEmail && (
          <StatusWrapper>
            <Status>
              <ButtonContainer
                email={userEmail}
                initialRelation={relationWithUserAndMe}
              />
            </Status>
          </StatusWrapper>
        )}
        <TimelineNav>
          <TimelineNavUl>
            <li>
              <NavTab to={`${PAGE_PATHS.MY_PAGE}/${userEmail}`}>
                {FEED_TEXT}
              </NavTab>
            </li>
            <li>
              <NavTab to={`${PAGE_PATHS.MY_PAGE}/${userEmail}/friends`}>
                {FRIEND_TEXT}
              </NavTab>
            </li>
          </TimelineNavUl>
        </TimelineNav>
      </TimelineHead>
      <TimelineBody
        userResidence={userResidence}
        userHometown={userHometown}
        friends={friends}
        userEmail={userEmail}
      />
      <ChatRooms />
    </ContentArea>
  );
};

export default MyPage;
