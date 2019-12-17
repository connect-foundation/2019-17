import React from 'react';
import styled from 'styled-components';
import Profile from 'components/Profile';
import { PAGE_PATHS } from 'Constants';
import { Link } from 'react-router-dom';

const ProfileDiv = styled.div`
  display: inline-block;
  padding-bottom: 0.5rem;
`;

const ProfileImgBox = styled(Link)`
  display: inline-block;
  padding-right: 0.5rem;
  cursor: pointer;
`;

const ProfileName = styled(Link)`
  margin-bottom: 0.25rem;
  padding-right: 22px;
  font-weight: bold;
  font-size: 0.875rem;
  color: ${props => props.theme.colors.fontMainBlue};
  :hover {
    text-decoration: underline;
  }
`;

const ProfileDateDiv = styled.span`
  margin-bottom: 0.25rem;
  font-size: 0.75rem;
`;

interface Iprops {
  email: string | null | undefined;
  createdAt: string;
  thumbnail?: string | null;
  nickName: string | null | undefined;
}

const FeedHeader = ({ createdAt, thumbnail, nickName, email }: Iprops) => {
  const Thumbnail = thumbnail || process.env.PUBLIC_URL + '/images/profile.jpg';

  return (
    <>
      <div>
        <ProfileImgBox to={PAGE_PATHS.MY_PAGE + '/' + email}>
          <Profile imageUrl={Thumbnail} alt={'profile image'} size="40px" />
        </ProfileImgBox>
        <ProfileDiv>
          <ProfileName to={PAGE_PATHS.MY_PAGE + '/' + email}>
            {nickName}
          </ProfileName>
          <ProfileDateDiv>{createdAt} </ProfileDateDiv>
        </ProfileDiv>
      </div>
    </>
  );
};

export default FeedHeader;
