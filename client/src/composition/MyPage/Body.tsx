import React from 'react';
import styled from 'styled-components';
import UserFeedsContainer from 'composition/UserFeeds/UserFeedsContainer';
import FriendsIcon from 'components/Icon/FriendsIcon';
import FriendsTable from 'composition/FriendList/tables';
import {
  INTRODUCTION_TEXT,
  RESIDENCE_TEXT,
  HOMETOWN_TEXT,
  FRIEND_TEXT
} from './text';
import { GetUserInfoByEmailQuery } from 'react-components.d';

const Wrapper = styled.div`
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

interface IProps {
  userResidence: string;
  userHometown: string;
  friends?: GetUserInfoByEmailQuery['friends'];
  userEmail: string;
}

const TimelineBody: React.FC<IProps> = props => (
  <Wrapper>
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
              {props.userResidence} {RESIDENCE_TEXT}
            </li>
            <li>
              <HometownIcon />
              {props.userHometown} {HOMETOWN_TEXT}
            </li>
          </SubBodyUl>
        </SubBody>
      </Sub>
      <Sub>
        <SubHeader>
          <FriendsIcon />
          <SubTitle>{FRIEND_TEXT}</SubTitle>
        </SubHeader>
        <FriendsTable>{props.friends}</FriendsTable>
      </Sub>
    </LeftDiv>
    <RightDiv>
      <UserFeedsContainer email={props.userEmail} />
    </RightDiv>
  </Wrapper>
);

export default TimelineBody;
