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
import { User, GetUserInfoWithEmailQuery } from 'react-components.d';

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
  userResidence: string;
  userHometown: string;
  friends?: GetUserInfoWithEmailQuery['friends'];
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
          <ModifyButton />
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
