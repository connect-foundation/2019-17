import React, { ReactNode } from 'react';
import styled from 'styled-components';
import Profile from './Profile';
import { DEFAULT } from 'Constants';

const CardWrapper = styled.div`
  ${props => props.theme.borders.feedBorder};
  background-color: #fff;
  margin-bottom: 10px;
  margin-top: 10px;
  width: 32rem;
  contain: content;
  padding: 24px 24px 12px 24px;
  display: flex;
  align-items: flex-start;
`;

const ProfileImgBox = styled.a`
  padding-right: 0.5rem;
  cursor: pointer;
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
    <CardWrapper>
      <ProfileImgBox>
        <Profile imageUrl={imageUrl} size="72px" />
      </ProfileImgBox>
      <ProfileNameDiv>{nickname}</ProfileNameDiv>
      {children}
    </CardWrapper>
  );
}

UserCard.defaultProps = {
  imageUrl: DEFAULT.PROFILE
};

export default UserCard;
