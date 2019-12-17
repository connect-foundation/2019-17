import React, { ReactNode } from 'react';
import styled from 'styled-components';
import Profile from './Profile';
import { DEFAULT } from 'Constants';

const CardDiv = styled.div`
  ${props => props.theme.borders.feedBorder};
  background-color: #fff;
  margin-bottom: 10px;
  width: 32rem;
  contain: content;
  padding: 12px;
  margin-top: 10px;
`;

const CardContentDiv = styled.div`
  padding: 12px 12px 0;
`;

const ProfileImgBox = styled.a`
  display: inline-block;
  float: left;
  padding-right: 0.5rem;
  cursor: pointer;
`;

const ProfileDiv = styled.div`
  padding-bottom: 0.5rem;
  display: flex;
`;

const ProfileNameDiv = styled.div`
  margin-bottom: 0.25rem;
  padding-right: 22px;
  font-weight: bold;
  font-size: 0.875rem;
  flex-grow: 1;
  margin-left: 12px;
  color: ${props => props.theme.colors.fontMainBlue};
`;

interface IProps {
  children?: ReactNode;
  imageUrl: string;
  nickname: string;
}

function UserCard({ imageUrl, nickname, children }: IProps) {
  return (
    <CardDiv>
      <CardContentDiv className="mainbox">
        <ProfileImgBox>
          <Profile
            imageUrl={imageUrl || DEFAULT.PROFILE}
            alt={'profile image'}
            size="72px"
          />
        </ProfileImgBox>
        <ProfileDiv>
          <ProfileNameDiv>{nickname}</ProfileNameDiv>
          {children}
        </ProfileDiv>
      </CardContentDiv>
    </CardDiv>
  );
}

UserCard.defaultProps = {
  imageUrl: DEFAULT.PROFILE
};

export default UserCard;
