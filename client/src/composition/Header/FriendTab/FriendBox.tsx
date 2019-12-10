import React, { ReactNode } from 'react';
import styled from 'styled-components';
import Profile from 'components/Profile';

const CardDiv = styled.div`
  ${props => props.theme.borders.feedBorder};
  background-color: #fff;
  contain: content;
  padding: 6px 12px;
`;

const CardContentDiv = styled.div`
  padding: 6px 12px 0;
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

function FriendBox({ imageUrl, nickname, children }: IProps) {
  return (
    <CardDiv>
      <CardContentDiv className="mainbox">
        <ProfileImgBox>
          <Profile
            imageUrl={
              imageUrl || process.env.PUBLIC_URL + '/images/profile.jpg'
            }
            alt={'profile image'}
            size="48px"
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

FriendBox.defaultProps = {
  imageUrl: process.env.PUBLIC_URL + '/images/profile.jpg'
};

export default FriendBox;
