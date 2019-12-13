import React from 'react';
import styled from 'styled-components';
import ButtonContainer from 'composition/Search/ButtonContainer';

import { useParams } from 'react-router-dom';
import Profile from 'components/Profile';
import UserFeedsContainer from './UserFeedsContainer';
import FriendsIcon from 'components/Icon/FriendsIcon';
import FriendsTable from 'composition/FriendList/tables';
import { PAGE_PATHS } from '../../constants';
import { Link } from 'react-router-dom';
import ActionButton from 'components/ActionButton';
import gql from 'graphql-tag';
import { useGetUserInfoWithEmailQuery } from 'react-components.d';

export const USERINFO_With_EMAIL = gql`
  query getUserInfoWithEmail($email: String!) {
    user: userWithEmail(email: $email) {
      email
      nickname
      thumbnail
      residence
      hometown
    }
    friends: friendsWithUserEmail(email: $email) {
      email
      nickname
      thumbnail
      residence
      hometown
    }
    me {
      email
    }
    relation: findRelation(email: $email)
  }
`;

const ALARM_STATUS_TEXT = '알림';
const FEED_TEXT = '피드';
const FRIEND_TEXT = '친구';
const INTRODUCTION_TEXT = '소개';
const RESIDENCE_TEXT = '거주';
const HOMETOWN_TEXT = '출신';

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

const TimelineBody = styled.div`
  margin-top: 12px;
  height: 100px;
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

const LeftDiv = styled.div`
  width: 323px;
  float: left;
  min-height: 1px;
  margin-right: 12px;
`;

const RightDiv = styled.div`
  width: 516px;
  float: left;
`;

const Sub = styled.div`
  word-wrap: break-word;
  background-color: #fff;
  border: 1px solid #dddfe2;
  border-radius: 3px;
  margin-bottom: 10px;
`;

const SubHeader = styled.div`
  margin-left: 0.75rem;
  margin-right: 0.75rem;
  padding-top: 0.75rem;
  padding-bottom: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: left;
`;

const SubTitle = styled.span`
  margin-left: 0.5rem;
`;

const SubBody = styled.div`
  margin-top: 0.25rem;
  border-top: 1px solid #ebedf0;
  margin-bottom: 0.5rem;
  margin-left: 0.75rem;
  margin-right: 0.75rem;
`;

const SubBodyUl = styled.ul`
  margin-top: 0.5rem;
  padding-top: 0.25rem;
  li {
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    font-size: 0.75rem;
    line-height: 1rem;
  }
`;

const InfoIcon = styled.span`
  background-image: url('/images/icons.png');
  background-size: 28px 648px;
  background-repeat: no-repeat;
  background-position: 0 -102px;
  width: 1.5rem;
  height: 1.5rem;
  display: block;
`;

const ResidenceIcon = styled.span`
  background-image: url('/images/icons.png');
  background-size: 28px 648px;
  background-repeat: no-repeat;
  background-position: 0 -312px;
  width: 1rem;
  height: 1rem;
  display: block;
  float: left;
  margin-right: 0.5rem;
`;

const HometownIcon = styled.span`
  background-image: url('/images/icons.png');
  background-size: 28px 648px;
  background-repeat: no-repeat;
  background-position: 0 -474px;
  width: 1rem;
  height: 1rem;
  display: block;
  float: left;
  margin-right: 0.5rem;
`;

const ModifyButton = styled.a`
  margin-bottom: 8px;
  margin-top: 8px;
  width: 100%;
  line-height: 26px;
  font-weight: bold;
  display: inline-block;
  justify-content: center;
  text-align: center;
  padding: 0 10px;
  box-sizing: border-box;
  border: 1px solid;
  border-radius: 2px;
  font-size: 12px;
  -webkit-font-smoothing: antialiased;
  text-decoration: none;
  white-space: nowrap;
  background-color: #f5f6f7;
  border-color: #ccd0d5;
  color: #4b4f56;
  transition: 200ms cubic-bezier(0.08, 0.52, 0.52, 1) background-color,
    200ms cubic-bezier(0.08, 0.52, 0.52, 1) box-shadow,
    200ms cubic-bezier(0.08, 0.52, 0.52, 1) transform;
  cursor: pointer;
  :focus,
  :hover {
    background-color: #ebedf0;
  }
  :active {
    background-color: #dddfe2;
    border-color: #bec3c9;
  }
  ::before {
    content: '상세 정보 수정';
  }
`;

interface IProps {
  UserEmail: string | undefined;
}

const MyPage: React.FC<IProps> = props => {
  const { email = '' } = useParams();
  const {
    data: { user = null, friends = null, me = null, relation = null } = {},
    loading
  } = useGetUserInfoWithEmailQuery({
    variables: { email },
    fetchPolicy: 'cache-and-network'
  });
  if (loading) return <></>;
  const userNickname = user && user.nickname;
  const userEmail = (user && user.email) || '';
  const userResidence = user && user.residence;
  const userHometown = user && user.hometown;
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
              <AlarmButton text={ALARM_STATUS_TEXT} />
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
      <TimelineBody>
        <LeftDiv>
          <Sub>
            <SubHeader>
              <InfoIcon />
              <SubTitle>{INTRODUCTION_TEXT}</SubTitle>
            </SubHeader>
            <SubBody>
              <SubBodyUl>
                <li>
                  <ResidenceIcon />
                  {userResidence} {RESIDENCE_TEXT}
                </li>
                <li>
                  <HometownIcon />
                  {userHometown} {HOMETOWN_TEXT}
                </li>
              </SubBodyUl>
              <ModifyButton />
            </SubBody>
          </Sub>
          <Sub>
            <SubHeader>
              <FriendsIcon />
              <SubTitle>{FRIEND_TEXT}</SubTitle>
            </SubHeader>
            <FriendsTable>{friends}</FriendsTable>
          </Sub>
        </LeftDiv>
        <RightDiv>
          <UserFeedsContainer email={userEmail} />
        </RightDiv>
      </TimelineBody>
    </ContentArea>
  );
};

export default MyPage;
