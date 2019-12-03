import React from 'react';
import styled from 'styled-components';
import Profile from 'components/Profile';

const ProfileDiv = styled.div`
  display: inline-block;
  padding-bottom: 0.5rem;
`;

const ProfileImgBox = styled.a`
  display: inline-block;
  float: left;
  padding-right: 0.5rem;
  cursor: pointer;
`;

interface ITest {
  size: string;
}

const ProfileNameDiv = styled.div`
  margin-bottom: 0.25rem;
  padding-right: 22px;
  font-weight: bold;
  font-size: 0.875rem;
  color: ${props => props.theme.colors.fontMainBlue};
`;

const ProfileDateDiv = styled.span`
  margin-bottom: 0.25rem;
  font-size: 0.75rem;
`;

interface Iprops {
  createdAt: string;
  thumbnail?: string | null;
  nickName: string | null | undefined;
}

const FeedHeader = ({ createdAt, thumbnail, nickName }: Iprops) => {
  const Thumbnail = thumbnail || process.env.PUBLIC_URL + '/images/profile.jpg';
  return (
    <>
      <div>
        <ProfileImgBox>
          <Profile imageUrl={Thumbnail} alt={'profile image'} size="40px" />
        </ProfileImgBox>
        <ProfileDiv>
          <ProfileNameDiv>{nickName}</ProfileNameDiv>
          <ProfileDateDiv>{createdAt} </ProfileDateDiv>
        </ProfileDiv>
      </div>
    </>
  );
};

export default FeedHeader;
